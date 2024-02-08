import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id; 

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); //see notes below
    
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({error: error.message}); //TODO make generic in prod
    }
}

/*
    User.find({_id: {$ne: loggedInUserId}}) Explanation:
    {_id: {$ne: loggedInUserId}}: This is the query criteria. It specifies that we want to find documents where the _id field does not equal ($ne) the loggedInUserId.
    _id: This is the field we're querying against. In MongoDB, the _id field is a unique identifier for each document.
    $ne: This is a MongoDB operator that means "not equal to". It's used to filter documents based on a condition.
    loggedInUserId: This is the value we're comparing against. We want to exclude documents where the _id matches this value.

*/