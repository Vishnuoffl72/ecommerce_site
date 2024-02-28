class APIFeatures{
    constructor(query, queryStr){
        this.query=query
        this.queryStr=queryStr
    }

    search(){
        let Keyword = this.queryStr.Keyword ?{
            name:{
                $regex: this.queryStr.Keyword,
                $options: 'i'
            }
        }:{}

        this.query.find({...Keyword})
        return this
    
    }

    filter(){
        const queryStrcopy = {...this.queryStr}
        const removeFields =[ 'Keyword', 'limit', 'page']
        removeFields.forEach((fields)=>{
            delete queryStrcopy[fields]
        })

        let queryStr = JSON.stringify(queryStrcopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr))
        return this
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage-1)
        this.query.limit(resPerPage).skip(skip)
        return this
    }


}

module.exports = APIFeatures