
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const {data:{virtualIceCream}} = await graphql(
        `
        { virtualIceCream {
        allIceCreams {
        id
        receiverName
        senderName
        message
        iceCreamColor { color1 color2 color3
        }}}}
    `
    );
    // console.log(JSON.stringify(result));
    virtualIceCream.allIceCreams.forEach(({ id, ts, receiverName, senderName, message, iceCreamColor }) => {
        createPage({
            path: `/ice-cream/${id}`,
            component: require.resolve("./src/templates/IceCreamPage.tsx"),
            context: {
                id,
                receiverName,
                senderName,
                message,
                iceCreamColor,
            }
        })
    })
}