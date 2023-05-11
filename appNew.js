async function travelApi() {
  try {
    const kcgTravel = await fetch(
      "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
    );
    // console.log(kcgTravel);
    const data = await kcgTravel.json();
    // console.log(data.result.records); 確認取回資料是否正確
    //先將取回資料複製一次在使用
    let dataArr = [];
    data.result.records.forEach((e) => {
      dataArr.push(e);
    });
    console.log(dataArr);
    /*  1. 取出區域  */
    let zoneList = [];
    // for (let i = 0; i < dataArr.length; i++) {
    //   let selectZone = dataArr[i].Zone;
    //   if (zoneList.indexOf(selectZone) == -1) {
    //     zoneList.push(selectZone);
    //   }
    // }
    dataArr.forEach((e) => {
      // zoneList.push(e.Zone);
      if (zoneList.indexOf(e.Zone) == -1) {
        zoneList.push(e.Zone);
      }
    });
    console.log(zoneList); //確認是否地區沒有重複
    //將區域顯示到選擇欄位裡
    let selectCity = document.querySelector(".city");
    zoneList.forEach((zone) => {
      selectCity.innerHTML += `<option>${zone}</option>`;
    });
    /* 2.動態增加資訊 */
    const cards = document.querySelector(".cards");
    cards.innerHTML = dataArr
      .map(
        (data) => `
    <div class="item">
      <div class="img">
        <img src="${data.Picture1}" alt="">
      </div>
      <div class="message">
        <p class="Name">名稱：${data.Name}</p>
        <p class="day">開放時間：${data.Opentime}</p>
        <p class="area">地區：${data.Zone}</p>
        <p class="location">地點：${data.Add}</p>
        <p class="tel">電話：${data.Tel}</p>
      </div>
    </div>
    `
      )
      .join("");
    /* 3.動態更新資料 */
    selectCity.addEventListener("change", () => {
      //更新區域名
      document.querySelector(".allArea").textContent = `${selectCity.value}`;
      //更新成所選區域資料
      cards.innerHTML = dataArr
        .map((data) => {
          return data.Zone === selectCity.value
            ? `
            <div class="item">
              <div class="img">
                <img src="${data.Picture1}" alt="">
              </div>
              <div class="message">
                <p class="Name">名稱：${data.Name}</p>
                <p class="day">開放時間：${data.Opentime}</p>
                <p class="area">地區：${data.Zone}</p>
                <p class="location">地點：${data.Add}</p>
                <p class="tel">電話：${data.Tel}</p>
              </div>
            </div>
          `
            : "";
        })
        .join("");
    });
  } catch (e) {
    console.log(e);
  }
}

travelApi();
