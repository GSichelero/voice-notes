customElements.define('notifications-table', class extends HTMLElement {
    constructor() {
      super();
  
      const shadowRoot = this.attachShadow({mode: 'open'});
      let keys = Object.keys(localStorage);
      if (keys.length > 0) {
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        let th4 = document.createElement("th");
        th1.textContent = "Title";
        th2.textContent = "Description";
        th3.textContent = "Time";
        th4.textContent = "Action";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        thead.appendChild(tr);
        table.appendChild(thead);
        keys.forEach(function (key) {
          let title = key
          let value = localStorage.getItem(key);
          let desc = value.split(":::")[0];
          let time = value.split(":::")[1];
          // if title is different than null string
          if (title !== "null") {
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = title;
            cell2.innerHTML = desc;
            cell3.innerHTML = time;

            let button = document.createElement("button");
            button.textContent = "Delete";
            button.addEventListener("click", function () {
              cancelScheduledNotification(title);
              localStorage.removeItem(title);
              this.parentNode.parentNode.removeChild(this.parentNode);
            });
            cell4.appendChild(button);
          }
        });
        shadowRoot.appendChild(table);
      }
  
      // add some CSS to the shadow dom
      const style = document.createElement('style');
      style.textContent = `
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          text-align: left;
          padding: 8px;
        }
        tr:nth-child(even){background-color: #f2f2f2}
        th {
          background-color: #4CAF50;
        }
  
        button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
      `;
      shadowRoot.appendChild(style);
    }
  });