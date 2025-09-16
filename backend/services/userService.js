import User from "../models/user.js";
import Event from "../models/events.js"
import notebooks from "../models/notebooks.js";

//confirm entered code by user, comparing code from db and this code
const confirmEnteredCode = async (eventId, code) => {
    const event = await Event.findOne({ _id: eventId });
    console.log(code)
    if (!event) {
        return ({
            message: "Event not found",
            status: 404,
            user: null
        })
    }
    if (code !== event.eventContent) {
        return ({
            message: 'Code do not match',
            status: 400,
            user: null
        });
    }
    await Event.findByIdAndDelete(eventId)
    const user = await User.findOne({ _id: event.userId });
    user.isActivated = true
    await user.save()
    return {
        message: 'Succesfuly confirmed',
        user,
        status: 200
    }
}

const createEvent = async ({ userId, eventContent }) => {
    if (!userId || !eventContent) {
        throw new HttpException(`No content`, HttpStatus.NOT_FOUND);
    }
    const event = new Event({ userId, eventContent })
    await event.save()
    return event;
}

const getUserByIdInToken = async (id) => {
    try {
        return await User.findOne({ _id: id })
    } catch (error) {
        console.log(error)
    }
}

const getUserByEmail = async (email) => {
    return await User.findOne({
        email: email
    });
}

const getUserByLogin = async (login) => {
    return await User.findOne({
        username: login
    });
}



export {
    confirmEnteredCode,
    createEvent,
    getUserByIdInToken,
    getUserByEmail,
    getUserByLogin
}
