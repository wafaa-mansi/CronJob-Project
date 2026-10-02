import cron from "node-cron";
import User from "../models/User.js";


function startUserStatusCron() {

    cron.schedule(
        "* * * * *",
        async function () {

            try {

                console.log(
                    "\nCron job running..."
                );


                const fiveMinutesAgo =
                    new Date(
                        Date.now() - 5 * 60 * 1000
                    );


                const users =
                    await User.find({
                        status: "active",
                        lastLogin: {
                            $lt: fiveMinutesAgo
                        }
                    });


                console.log(
                    `${users.length} inactive users found`
                );


                if (users.length === 0) {

                    console.log(
                        "0 users updated"
                    );

                    return;

                }


                const userIds =
                    users.map(
                        function (user) {
                            return user._id;
                        }
                    );


                const result =
                    await User.updateMany(

                        {
                            _id: {
                                $in: userIds
                            },

                            status: "active"
                        },

                        {
                            $set: {
                                status: "inactive"
                            }
                        }

                    );


                console.log(
                    `${result.modifiedCount} users updated to inactive`
                );


            }
            catch (error) {

                console.log(
                    "Cron job error:",
                    error
                );

            }

        },
        {
            noOverlap: true
        }
    );


    console.log(
        "Cron job started"
    );

}


export default startUserStatusCron;