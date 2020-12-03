import axios from 'axios';

exports.handler = async (event: any, context: any, callBack: any) => {
    console.log(JSON.stringify(event, null, 2));
    console.log("dispatch API", process.env.GITHUB_DISPATCH_API)

    try{


        await axios.post(process.env.GITHUB_DISPATCH_API as string,
            { "event_type": "virtual.ice-cream.added" },
            {
                headers: {
                    Accept: "application/vnd.github.everest-preview+json",
                    Authorization: `Bearer ${process.env.GITHUB_DISPATCH_WORKFLOW_TOKEN}`,
                    "Content-Type": "application/json",
                }
            }
        );
    
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            success: true
        }


    }catch(err){
        console.log(err);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            success: false
        }
    }

}