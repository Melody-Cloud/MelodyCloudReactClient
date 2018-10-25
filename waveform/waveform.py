from PIL import Image, ImageDraw
import numpy as np
import os
import boto3
import subprocess


def lambda_handler(event, context):
    name_of_bucket_with_songs = os.environ['name_of_bucket_with_songs']
    name_of_bucket_with_output_images = os.environ['name_of_bucket_with_output_images']
    name_of_audio_file_on_s3bucket = event['audio']

    # CONFIGURATION FOR WAVEFORM VISUALS
    amount_of_waveform_bars = int(os.environ.get('amount_of_waveform_bars', 300))
    bar_height_in_plot = int(os.environ.get('bar_height_in_plot', 200))
    line_width_in_plot = int(os.environ.get('line_width_in_plot', 5))

    s3 = boto3.resource('s3')
    s3.Bucket(name_of_bucket_with_songs).download_file(
        name_of_audio_file_on_s3bucket, '/tmp/{0}'.format(name_of_audio_file_on_s3bucket))

    subprocess.call(['cp /var/task/ffmpeg /tmp/ffmpeg'], shell=True)
    subprocess.call(['chmod 755 /tmp/ffmpeg'], shell=True)
    subprocess.call(['/tmp/ffmpeg -i /tmp/{0} /tmp/output.wav'.format(name_of_audio_file_on_s3bucket)], shell=True)

    with open('/tmp/output.wav', 'rb') as fd:
        contents = fd.read()
        data = np.fromstring(contents, np.int16)

        length = len(data)
        RATIO = length / amount_of_waveform_bars

        count = 0
        maximum_item = 0
        max_array = []
        highest_line = 0

        for d in data:
            if count < RATIO:
                count = count + 1

                if abs(d) > maximum_item:
                    maximum_item = abs(d)
            else:
                max_array.append(maximum_item)

                if maximum_item > highest_line:
                    highest_line = maximum_item

                maximum_item = 0
                count = 1

        line_ratio = highest_line / bar_height_in_plot

        im = Image.new('RGBA', (amount_of_waveform_bars * line_width_in_plot, bar_height_in_plot), (255, 255, 255, 1))
        draw = ImageDraw.Draw(im)

        current_x = 1
        for item in max_array:
            item_height = item / line_ratio

            current_y = (bar_height_in_plot - item_height) / 2
            draw.line((current_x, current_y, current_x, current_y + item_height), fill=(169, 171, 172), width=4)

            current_x = current_x + line_width_in_plot

        im.save('/tmp/out.png')

        s3.Bucket(name_of_bucket_with_output_images).upload_file(
            '/tmp/out.png', '{0}.png'.format(name_of_audio_file_on_s3bucket))
