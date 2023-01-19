
function wait(milliseconds) 
{
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function delay(milliseconds) {
    await wait(milliseconds);
}

export default delay;