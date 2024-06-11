const axios = require('axios');

exports.generateMealPlan = async (req, res) => {
    try {
        const apiKey = process.env.SPOONACULAR_API_KEY;
        const userEmail = process.env.USER_EMAIL;
        const timeFrame= req.query.timeFrame;
        const targetCalories= req.query.targetCalories;
        const exclude= req.query.exclude;
        const diet= req.query.diet;

        // Step 1: Generate a user hash (if needed)
        const connectResponse = await axios.post(`https://api.spoonacular.com/users/connect?apiKey=${apiKey}`, {
            username: userEmail,
        });
        const { username, hash } = connectResponse.data;

        // Step 2: Generate a meal plan
        const generateResponse = await axios.get(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&exclude=${exclude}&diet=${diet}`,
            // {
            //     targetCalories: req.body.targetCalories || 2000,
            //     diet: req.body.diet || 'vegetarian',
            //     exclude: req.body.exclude || 'shellfish, olives',
            //     // timeFrame: req.query.timeFrame,
            // },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Step 3: Retrieve the meal plan
        // const startDate = req.body.startDate || '2024-06-09';
        // const retrieveResponse = await axios.get(
        //     `https://api.spoonacular.com/mealplanner/${username}/week/${startDate}?apiKey=${apiKey}&hash=${hash}`
        // );

        // Send the meal plan back to the client
        res.json(generateResponse.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate meal plan' });
    }
};
