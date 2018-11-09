import 'assets/scss/CommentSection.scss';
import React from 'react';
import _ from 'lodash';

import { Comment, Header } from 'semantic-ui-react';
import { userAvatars } from '../utils/mocks';
import PropTypes from 'prop-types';


class CommentSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {comments} = this.props;

        return <Comment.Group className='comment-section'>
            <Header as='h3' dividing>
                Comments
            </Header>

            {
                _.map(comments, comment => {
                    return <Comment>
                        <Comment.Avatar src={
                            _.sample(userAvatars)
                        } />
                        <Comment.Content>
                            <Comment.Author>
                                {comment.commentAuthorName}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.createdDate}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.commentContent}</Comment.Text>
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

CommentSection.propTypes = {
    comments: PropTypes.array,
};