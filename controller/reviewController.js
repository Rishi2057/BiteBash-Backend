const testimonials = require("../model/Testimonial")

exports.postReviewController = async (req, res) => {
    const userMail = req.payload
    console.log(userMail);

    const { reviewRestuarent, review, rating ,user } = req.body
    console.log(reviewRestuarent, review, rating);

    let pic = null

    if (req.file) {
        pic = req?.file.filename
        console.log(pic);

    }

    try {
        const reviewposts = new testimonials({
            email: userMail,
            name:user,
            reviewRestuarent,
            review,
            rating,
            pic
        })
        console.log("issue");
        const reviewSave = await reviewposts.save()
        res.status(200).json(reviewSave)
    } catch (error) {
        res.status(500).json(error)
    }
}


// get all reviews

exports.getAllReviewsController = async (req, res) => {
    try {
        const allReviews = await testimonials.find()
        res.status(200).json(allReviews)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get user review
exports.getUserReview = async (req,res)=>{
    const {itemData} = req.params
    try {
        const clientReview = await testimonials.find({email:itemData})
        res.status(200).json(clientReview)
    } catch (error) {
        res.status(500).json(error)
    }
}