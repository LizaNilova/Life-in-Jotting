export interface authState {
    // user: any;
    isLoading: Boolean;
    status: string | null,
    eventId: string | null
}

export interface userState {
    user: any
    isLoading: Boolean
    status: string | null
}

export interface pageState {
    active_notebook: string | null,
    notebooks: Array<{
        _id: string,
        user: string,
        name: string,
        cover: string | null
    } | null>,
    pages: Array<{
        title: string,
        id: string
    } | null>,
    page: {
        _id: string | null,
        notebook: string | null,
        title: string,
        bg_color: string | null,
        category: string | null,
        blocks: Array<{
            text: string | null,
            isDone: boolean,
            depth: number,
            inlineStyleRanges: Array<
                {
                    offset: number,
                    length: number,
                    style: string | null,
                    text_color: string,
                } | null
            >,
            entityRanges: Array<
                {
                    offset: number,
                    // type: string,                 //image, toDoList, ...
                    src: string | null,                  //for image type
                    // height: string,
                    // width: string,
                    // alignSelf: string,
                    // toDoItems: Array<{                           // for to-do list type
                    //     text: string | null,
                    //     done: boolean
                    // } | null>
                } | null>,
            font: string | null,
            fontSize: number | null,
            border_color: string | null,
            textAlign: string | null
        } | null>
        bg_url: string | null
    } | null,
    message: string | null
}

// export interface notebookState {
//     pages: Array<string | null>
// }

export interface registerParams {
    username: string;
    password: string;
    passwordConfirmation: string;
    email: string
}

export interface loginParams {
    username: null | string;
    password: null | string;
}

export interface confirmEmailParams {
    code: string
    id: string
}

export interface forgotPasswordParams {
    email: string
}

export interface resetPasswordParams {
    newPass: string
    repeatPass: string
    token: string | undefined
}

export interface notebookListItemProperty {
    notebook: {
        id: string,
        name: string,
        cover: string | null,
        user: string
    } | null
}

export interface pageComponentProperties {
    notebook_id: string
}

// export interface pageListItemProperties {
//     page: {
//         notebook: string,
//         title: string,
//         bg_color: string,
// blocks: [
// {
//     text: string | null,
//     depth: number,
//     inlineStyleRanges: [
//         {
//             offset: number,
//             length: number,
//             style: string | null,
//             text_color: string,
//         }
//     ],
//     entityRanges: [
//         {
//             offset: number,
//             type: string,                 //image, toDoList, ...
//             src: string | null,                  //for image type
//             height: string,
//             width: string,
//             alignSelf: string,
//             toDoItems: [{                           // for to-do list type
//                 text: string | null,
//                 done: boolean
//             }]
//         }
//     ],
//     font: string | null,
//     fontSize: number | null,
//     border_color: string | null,
//     textAlign: string
// }
//         ],
//         bg_url: string
//     }
// }