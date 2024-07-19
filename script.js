
async function getDriver() {
    
    const easterEgg = document.getElementById("easterEgg")
    const easterText = document.getElementById("easterText")
    const imageDriver =  document.getElementById("imageDriver")
    const numberDriver = document.getElementById("searchBar").value
    const nameDriver = document.getElementById("nameDriver")
    
    const url = `https://api.openf1.org/v1/drivers?driver_number=${numberDriver}&session_key=9158`
    
    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error(`Response status is ${response.status}`);
        }
        
        const data = await response.json();
        
        switch (data[0].driver_number) {
            case 14:
                easterEgg.src = "https://www.youtube.com/embed/0Y2PPxrBJt8?si=M7Z8g18bXEoclfi5"
                easterText.innerText = "VAMOOOOSSSSSSS!!!!! 🔥🔥🔥🔥"
                break;
            case 1:
                easterEgg.src = "https://www.youtube.com/embed/BLdVvIwUXK4?si=n6IE87uufaDKb3L_"
                easterText.innerText = "SID 🤓💩"
                break;
            case 10:
                easterEgg.src = "https://www.youtube.com/embed/RCSutBfECNQ?si=OE5qW_ENeZGS-Wx9"
                easterText.innerText = "THE GOAT 🐐"
                break;
            default:
                break;
        }
        
        imageDriver.src = data[0].headshot_url;
        imageDriver.style.display = "block";
        nameDriver.innerText = data[0].full_name
    }
    
    catch (error) {
        console.error("Error is " + error.message);
        alert("Driver doesn't exist");
    }
    
}

async function getDriverList() {
    
    const url = "https://api.openf1.org/v1/drivers"
    let driverNumberSet = new Set();
    
    try {
        const response = await fetch(url)
        
        if(!response.ok) {
            throw new Error(`Response status is ${response.status}`)
        }
        
        const data = await response.json();
        alert("Data successfully loaded!");
        console.log(data)
        let table = document.getElementById("driverTable")
        table.innerHTML = data.splice(0, 50)
            .filter(item => {
                const isUnique = !driverNumberSet.has(item.driver_number);
                if (isUnique) {
                    driverNumberSet.add(item.driver_number);
                }
                return isUnique;
            })
            .map(item => {
                driverNumberSet.add(item.driver_number);
                return `<tr>
                               <td>${item.driver_number}</td>
                               <td>${item.full_name}</td>
                               <td>${item.team_name}</td>
                               <td><i class="fa-solid fa-circle" style="color:#${item.team_colour};"></i></td>
                          </tr>`;
            }).join('');
        
    }
    
    
    catch (error) {
        console.error("Error is " + error.message);
        alert("Something went wrong!");
    }
    
}

function searchDriverList() {
    
    const driverSearchName = document.getElementById("searchBarList").value.toLowerCase();
    const driverTable = document.getElementById("driverTable");
    const rows = driverTable.getElementsByTagName("tr");
    
    for (let i = 0; i < rows.length; i++) {
        let driverNameTd = rows[i].getElementsByTagName("td")[1];
        
        if (driverNameTd) {
            let driverName = driverNameTd.textContent || driverNameTd.innerText;
            if (driverName.toLowerCase().indexOf(driverSearchName) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
        
    }
    
}

function clearSearchBar() {

    const driverSearchName = document.getElementById("searchBarList");
    const driverSearchButton = document.getElementById("clearButton");
    driverSearchButton.addEventListener("click", () => {
        driverSearchName.value = "";
        searchDriverList()
    });

}

