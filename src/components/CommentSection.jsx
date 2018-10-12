import React from 'react';
import _ from 'lodash';

import { Comment, Header } from 'semantic-ui-react';
import { mockedComments } from '../utils/mocks';


class CommentSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>

            {
                _.map(mockedComments, comment => {
                    return <Comment>
                        <Comment.Avatar src={comment.author.avatarImageUrl} />
                        <Comment.Content>
                            <Comment.Author>
                                {comment.author.name}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.datetime}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.content}</Comment.Text>
                            {/*<Comment.Actions>*/}
                                {/*<Comment.Action>Reply</Comment.Action>*/}
                            {/*</Comment.Actions>*/}
                        </Comment.Content>
                    </Comment>;
                })
            }
        </Comment.Group>;
    }
}

export default CommentSection;
