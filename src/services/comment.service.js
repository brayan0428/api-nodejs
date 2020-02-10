const BaseService = require('./base.service')
const _commentRepostitory = null,
      _ideaRepository = null

class CommentService extends BaseService{
    constructor({CommentRepository, IdeaRepository}){
        super(CommentRepository)
        _commentRepostitory = CommentRepository
        _ideaRepository = IdeaRepository
    }

    async createComment(comment,ideaId){
        if(!ideaId){
            const error = new Error()
            error.status = 400
            error.message = "IdeaId must be sent"
            throw error
        }
        const idea = _ideaRepository.get(ideaId)
        if(!idea){
            const error = new Error()
            error.status = 404
            error.message = "Idea does not exist"
            throw error
        }

        const createdComment = await _commentRepostitory.create(comment)
        idea.comments.push(createdComment)

        return await _ideaRepository.update(ideaId, {comments: idea.comments})
    }
}

module.exports = CommentService