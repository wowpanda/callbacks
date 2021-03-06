let callbacks = {};

RegisterNetEvent('callbacks:client')
onNet('callbacks:client', ( result, id ) => {
    if ( id >= 0 ) {
        callbacks[id](result);
        delete callbacks[id];
    } else {
        console.error('No callback ID set');
    }
});

/**
 * @param {string} name - The name of the server event
 * @param {object} data - The object that contains data that you send to the server event
 * @param {function} cb - The callback that handles the response
 */
function serverCallback( name, data, cb ) {
    let id = Object.keys( callbacks ).length++;
    callbacks[id] = cb;
    data['CallbackID'] = id;
    emitNet(name, data);
}