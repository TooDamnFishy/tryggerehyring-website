const bestill = {
    new_table_row: function(index) {
        let attachments = "";
        for (let i = 0; i < candidates[index].attachments.length; i++) {
            attachments += candidates[index].attachments[i].name + "<br />";
        }

        let servicesString= "";
        for (let i = 0; i < candidates[index].services.length; i++) {
            servicesString += candidates[index].services[i] + "<br />";
        }
        
        fileInputID = `file-input-${index}`;

        element = document.getElementById("kandidat-table");
        content = `
        <div id="table-cell-0-${index}" class="kandidat-table-content">
            <input class="kandidat-name-input" id="kandidat-name-input-${index}" type="text" oninput="bestill.onchange_name(${index})" value="${candidates[index].name}" placeholder="Skriv inn navn"/>
        </div>
        <textarea id="table-cell-1-${index}" oninput="bestill.onchange_info(${index})" class="kandidat-info-input kandidat-table-content" type="text" placeholder="Skriv inn ytterlig informasjon">${candidates[index].information}</textarea>
        <div id="table-cell-2-${index}" class="kandidat-table-content">
            ${attachments}
            <label for="${fileInputID}-${index}">
                Last opp dokument
                <input id="${fileInputID}-${index}" type="file" multiple/>
            </label>
        </div>
        <div id="table-cell-3-${index}" class="kandidat-table-content">
            ${servicesString}
            <div class="highlighted-underlined" onclick="openModal('service-selection-modal'), bestill.create_all_modal_checkboxes(${index})">Rediger</div>
        </div>
        <div id="table-cell-4-${index}" class="kandidat-table-content">
            <div class="highlighted-underlined" onclick="removeCandidate(${index})">
                Fjern kandidat
            </div>
        </div>
        `
        element.innerHTML += content;
    },

    create_all_rows: function(length) {
        if (!length) {
            length = candidates.length
        }

        for (let i = 0; i < length; i++) {
            try {
                this.delete_table_row(i, false)
            } catch {

            }
        }
        for (let i = 0; i < candidates.length; i++) {
            this.new_table_row(i);
        }

        for (let i = 0; i < candidates.length; i++) {
            fileInputID = `file-input-${i}`;
            attachmentAddEventListener(`${fileInputID}-${i}`, i);
        }
    },

    delete_table_row: function(index, button) {
        for(let i = 0; i < 5; i++) {
            document.getElementById(`table-cell-${i}-${index}`).remove();
        }
    },

    create_serivce: function(name, description) {
        element = document.getElementById("tjenester-card-section");
        content = `
        <div class="checkbox-card">
            <h3>${name}</h3>
            <img class="checkbox-card-icon" src="images/search-icon.svg"/>
            <div class="checkbox-card-text">${description}</div>
            <img class="checkbox-icon" onclick="serviceCheckBox(null, '${name}')" id="${name}-checkbox" src="images/checkbox-unchecked.svg"/>
        </div>`

        element.innerHTML += content;
    },

    create_all_services: function() {
        Object.keys(services).forEach(function(key) {
            bestill.create_serivce(services[key].name, services[key].description);
        });
    },

    onchange_name: function(index) {
        candidates[index].name = document.getElementById(`kandidat-name-input-${index}`).value;
    },

    onchange_info: function(index) {
        candidates[index].information = document.getElementById(`table-cell-1-${index}`).value;
    },

    create_modal_checkbox: function(index, name, checked) {
        if(checked) {
            checkbox = "checkbox-checked";
        } else {
            checkbox = "checkbox-unchecked";
        }
        content = `
        <div class="modal-service-option">
            <img class="modal-service-icon" src="images/search-icon.svg"/>
            <div id="${name}">${name}</div>
            <img class="modal-checkbox" onclick="serviceCheckBox(${index}, '${name}')" id="${name}-modal-checkbox" src="images/${checkbox}.svg"/>
        </div>`

        element = document.getElementById("service-selection-container");
        element.innerHTML += content;
    },

    create_all_modal_checkboxes: function(index) {
        document.getElementById("service-selection-container").innerHTML = "";
        Object.keys(services).forEach(function(key) {
            bestill.create_modal_checkbox(index, services[key].name, candidates[index].services.includes(services[key].name));
        });
    }
}

bestill.create_all_services();
bestill.create_all_rows();