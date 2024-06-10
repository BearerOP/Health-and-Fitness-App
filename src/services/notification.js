const admin = require("firebase-admin");
const userModel = require("../models/user_model");
const path = require("path");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require(path.resolve(__dirname, "../../serviceAccountKey.json"))
    ),
  });
}

/**
 * Function to get the notification token of a user
 * @param {String} userId - The ID of the user
 * @returns {Promise<String>} - The notification token of the user
 */
const getUserToken = async (userId) => {
  const user = await userModel.findById(userId);
  if (user && user.notificationToken) {
    return user.notificationToken;
    // return user.notificationToken || 'ecwoGw__ROWau-klkXfyg3:APA91bEHviRi8Dem0iilY2ZBLhGLHaEoMiVonK_DvQRsgEA3uMw9MJgo5-l3xSzBeqRuTIniTpBtn7tZKIsM3epRdLJgO7Xhag7oPjplgc1Wwx-6Hq-kHq-SfZKZAEo7TlWD7hLHu9w5';
  } else {
    throw new Error("User not found or notification token is missing");
  }
};

/**
 * Function to send a notification to a user
 * @param {String} token - The notification token of the user
 * @param {String} message - The message to be sent
 */
const sendNotification = async (token, message) => {
  try {
    const response = await admin.messaging().send({
      token: token,
      notification: {
        title: "Reminder",
        body: message,
      },
    });

    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = {
  getUserToken,
  sendNotification,
};
