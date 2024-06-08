const userModel = require("../models/user_model");
const goalModel = require("../models/goal_model");

exports.user_goal_added = async (req, res) => {
  try {
    let user_id = req.user._id;

    if (user_id) {
      const type = req.body.type;
      const description = req.body.description;
      const target_value = req.body.target_value;
      const current_value = req.body.current_value;
      const unit = req.body.unit;
      const deadline = req.body.deadline;

      if (
        type &&
        description &&
        target_value &&
        current_value &&
        unit &&
        deadline
      ) {
        let goal_data = await goalModel.findOne({ user_id: user_id });
        if (goal_data) {
          goal_data.goal_details.push({
            type: type,
            description: description,
            target_value: target_value,
            current_value: current_value,
            unit: unit,
            deadline: deadline,
          });
          let added_goal = await goalModel.findOneAndUpdate(
            { user_id: user_id },
            {
              $set: { goal_details: goal_data.goal_details },
            },
            { new: true }
          );
          if (added_goal) {
            return {
              message: "New goal Added Successfully",
              success: true,
            };
          } else {
            return {
              message: "Something Went Wrong",
              data: [],
              success: false,
            };
          }
        } else {
          // if data doesn't exist, create a new entry
          let savedata = new goalModel({
            user_id: user_id,
            goal_details: [
              {
                type: type,
                description: description,
                target_value: target_value,
                current_value: current_value,
                unit: unit,
                deadline: deadline,
              },
            ],
          });
          let saved_data = await savedata.save();
          if (saved_data)
            return {
              message: "goal Added Successfully",
              success: true,
            };
          else {
            return {
              message: "Something Went Wrong",
              success: false,
            };
          }
        }
      } else {
        return {
          message: "please enter complete details about goal",
          success: false,
        };
      }
    } else {
      return {
        message: "user not found",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};

exports.user_goal_update = async (req, res) => {
  try {
    let user_id = req.user._id;
    if (user_id) {
      const _id = req.body._id;

      const description = req.body.description;
      const target_value = req.body.target_value;
      const deadline = req.body.deadline;

      if (_id) {
        let goal_data = await goalModel.findOne({ user_id: user_id });
        if (goal_data) {
          let goal_details = goal_data.goal_details.find(
            (goal_details) => goal_details._id == _id
          );
          if (goal_details) {
            if (description && target_value && deadline) {
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;

              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = target_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = deadline;
            } else if (
              description &&
              target_value == undefined &&
              deadline == undefined
            ) {
              const t_value = goal_details.target_value;
              const dead = goal_details.deadline;
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;

              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = t_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = dead;
            } else if (
              description == undefined &&
              target_value &&
              deadline == undefined
            ) {
              const description = goal_details.description;
              const dead = goal_details.deadline;
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;

              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = target_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = dead;
            } 
            else if (
              description == undefined &&
              target_value == undefined &&
              deadline
            ) {
              const description = goal_details.description;
              const t_value = goal_details.target_value;
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;
              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = t_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = deadline;
            }
            else if (
              description == undefined &&
              target_value&&
              deadline
            ) {
              const description = goal_details.description;
              
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;
              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = target_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = deadline;
            }
            else if (
              description &&
              target_value&&
              deadline== undefined 
            ) {
              const dead = goal_details.deadline;
              
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;
              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = target_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = dead;
            }
            else if (
              description &&
              target_value== undefined &&
              deadline
            ) {
              const target_value = goal_details.target_value;
              
              const type = goal_details.type;
              const current_value = goal_details.current_value;
              const unit = goal_details.unit;
              goal_details.type = type;
              goal_details.description = description;
              goal_details.target_value = target_value;
              goal_details.current_value = current_value;
              goal_details.unit = unit;
              goal_details.deadline = deadline;
            }

            await goal_data.save();

            if (goal_data) {
              return {
                message: "update successfully",
                data: goal_data,
                success: true,
              };
            } else {
              return {
                message: "data did not update",
                data: [],
                success: false,
              };
            }
          } else {
            return {
              message: "no goal data",
              data: [],
              success: false,
            };
          }
        } else {
          return {
            message: "This user has no goal data",
            data: [],
            success: false,
          };
        }
      } else {
        return {
          message: "goal id is not given",
          data: [],
          success: false,
        };
      }
    } else {
      return {
        message: "user not found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    return {
      message: error,
      data: [],
      success: false,
    };
  }
};

exports.user_goal_delete = async (req, res) => {
  try {
    const user_id = req.user._id;
    const _id = req.body._id; // _id --> goal_id
    if (user_id) {
      let arr = [];
      if (_id) {
        let goal_data = await goalModel.findOne({ user_id: user_id });
        if (goal_data) {
          let goal_details = goal_data.goal_details.findIndex(
            (goal_details) => goal_details._id == _id
          );

          if (goal_details != -1) {
            for (let i = 0; i < goal_data.goal_details.length; i++) {
              if (
                goal_data.goal_details[i] !==
                goal_data.goal_details[goal_details]
              ) {
                arr.push(goal_data.goal_details[i]);
                await goal_data.save();
              }
            }

            await goalModel.findOneAndUpdate(
              { user_id: user_id },
              { $set: { goal_details: arr } }
            );

            return {
              message: "goal delet successfully",
              data: goal_data,
              success: true,
            };
          } else {
            return {
              message: "goal not found",
              data: [],
              success: false,
            };
          }
        } else {
          return {
            message: "users goal is empty",
            data: [],
            success: false,
          };
        }
      } else {
        return {
          message: "_id not recive",
          data: [],
          success: false,
        };
      }
    } else {
      return {
        message: "user not found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.view_user_goal = async (req, res) => {
  try {
    let user_id = req.user._id;
    if (user_id) {
      const goal_data = await goalModel.findOne({ user_id: user_id });
      if (goal_data) {
        const obj = goal_data.goal_details.reduce((acc, item, index) => {
          acc[index] = item;
          return acc;
        }, {});
        return {
          success: true,
          message: "View All goal",
          goal_data: obj,
        };
      } else {
        return {
          message: "goal not found",
          data: [],
          success: false,
        };
      }
    } else {
      return {
        message: "user not found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    return {
      message: error,
      data: [],
      success: false,
    };
  }
};
