
async function getDriver() {
    let numberDriver = document.getElementById("searchbar").value
    const url = `https://api.openf1.org/v1/drivers?driver_number=${numberDriver}&session_key=9158`
    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error(`Response status is ${response.status}`);
        }
        const data = await response.json();
        
        switch (data[0].driver_number) {
            case 14:
                document.getElementById("easterEgg").src = "https://www.youtube.com/embed/0Y2PPxrBJt8?si=M7Z8g18bXEoclfi5"
                document.getElementById("easterText").innerText = "VAMOOOOSSSSSSS!!!!!"
                break;
            case 1:
                document.getElementById("easterEgg").src= "https://www.youtube.com/embed/BLdVvIwUXK4?si=n6IE87uufaDKb3L_"
                document.getElementById("easterText").innerText = "SID 🤓"
            default:
                break;
        }
        
        document.getElementById("imageDriver").src = data[0].headshot_url;
        document.getElementById("imageDriver").style.display = "block";
        document.getElementById("nameDriver").innerText = data[0].full_name
    }
    catch (error) {
        console.error("Error is " + error.message);
        alert("Driver doesn't exist");
    }
}

async function getDriverList() {
    const url = "https://api.openf1.org/v1/drivers"
    let driverNumberArray = [];
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`Response status is ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
        let table = document.getElementById("driverTable")
            for (let i = 0; i < 50; i++){
                if(!driverNumberArray.includes(data[i].driver_number)) {
                    let row = `<tr>
                                   <td>${data[i].driver_number}</td>
                                   <td>${data[i].full_name}</td>
                                   <td>${data[i].team_name}</td>
                                   <td><i class="fa-solid fa-circle" style="color:#${data[i].team_colour};"></i></td>
                              </tr>
                                  `
                    table.innerHTML += row;
                    driverNumberArray.push(data[i].driver_number)
                    console.log(driverNumberArray)
                }
            }

    }
    catch (error) {
        console.error("Error is " + error.message);
        alert("Something went wrong!");
    }
}

