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
