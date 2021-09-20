const socket = io();

Handlebars.registerHelper("notEmpty", (value) => {
  return value.length > 0;
});

const hbsTemplate = Handlebars.compile(`
    <h1>Productos Cargados:</h1>
    {{#if (notEmpty list)}}
        <table>
            <thead>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Foto</th>
            </thead>
            <tbody>
                {{#each list }}
                    <tr>
                        <td>{{this.title}}</td>
                        <td>{{this.price}}</td>
                        <td><img src={{this.thumbnail}} alt="icon" width="50" height="50"></td>
                    </tr>
                {{/each }}
            </tbody>
        </table>
    {{else}}
        <h3>No hay productos cargados</h3>
    {{/if}}
`);

socket.on("productos", (data) => {
  const html = hbsTemplate({ list: data });
  document.getElementById("productos").innerHTML = html;
});

socket.on("messages", (data) => {
  document.getElementById("chat").innerHTML = data.map(
    (entry) => `<div>
                    <span style="font-weight: bold; color: blue;">${entry.author}</span>
                    <span style="color: brown;">${entry.text}</span>
                    <span style="font-style: italic; color: green;">${entry.fecha}</span>
                </div>`
  ).join("");
});

function addMessage() {
    const message = {
        author: document.getElementById("email").value,
        text: document.getElementById("text").value,
        fecha: new Date().toLocaleString("es-AR"), // NUEVO
    }
    socket.emit("new_message", message);
    document.getElementById("text").value = ""; 
    return false;
}