const uri = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
fetch(uri)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        //console.log(data); //撈回來的api原資料
        // 先用一個空陣列皆需要的資料，再用forEach將每筆資料push進DataArr陣列
        let DataArr = []; 
        data.result.records.forEach(e => (DataArr.push(e)));
        //console.log(DataArr); //已取出需要資料並加入陣列

        // 1. 要將select選單放入區域名稱。建立一個空陣列放全部Zone(區域名稱)
        // 2. 使用indexOf()比對資料，如果相同區域名稱只取一次，select選單就不會出多個相同區域名稱
        let zoneList = [];
        // for (let i = 0; i < DataArr.length; i++) {
        //     let selectZone = DataArr[i].Zone;
        //     if (zoneList.indexOf(selectZone) == -1) {
        //         zoneList.push(selectZone);
        //     }
        // }
        for (let i in DataArr) {
            let selectZone = DataArr[i].Zone;
            if (zoneList.indexOf(selectZone) == -1)(zoneList.push(selectZone));
        }
        console.log(zoneList); // 檢查區域名稱是不是正確且沒重複

        // 3. 將動態增加select選項(option)
        let selectCity = document.querySelector('.city');
        // for (let i = 0; i < zoneList.length; i++) {
        //     let option = document.createElement('option'); //增加一個option標籤
        //     option.textContent = zoneList[i];   //加入區域名稱
        //     // option.setAttribute('value', option.value);
        //     selectCity.appendChild(option); // 顯示動態新增的option標籤
        // }
        for (let i in zoneList) {
            let option = document.createElement('option'); //增加一個option標籤
            option.textContent = zoneList[i];   //加入區域名稱
            // option.setAttribute('value', option.value);
            selectCity.appendChild(option); // 顯示動態新增的option標籤
        }

        // 4. 動態增加資訊
        let cards = document.querySelector('.cards');
        for (let i in DataArr) { 
            let Name = DataArr[i].Name; // 撈出所有陣列裡面Name(名稱)的值
            let Opentime = DataArr[i].Opentime; // 撈出所有陣列裡面Opentime(開放時間)的值
            let Zone = DataArr[i].Zone; // 撈出所有陣列裡面Zone(區域)的值
            let Add = DataArr[i].Add; // 撈出所有陣列裡面Add(地點)的值
            let Picture1 = DataArr[i].Picture1; // 撈出所有陣列裡面Picture1(相片連結)的值
            let Tel = DataArr[i].Tel; // 撈出所有陣列裡面Tel(電話)的值


            // console.log(Zone,Picture1,Opentime,Tel); // 確認是否正確撈出所要的值
            // 使用innerHTML可以加入文字和html標籤(註:textContent只能加入文字)，使用${變數}將資訊替換
            cards.innerHTML += ` 
            <div class="item">
                <div class="img">
                    <img src="${Picture1}" alt="">
                </div>
                <div class="message">
                    <p class="Name">名稱：${Name}</p>
                    <p class="day">開放時間：${Opentime}</p>
                    <p class="area">地區：${Zone}</p>
                    <p class="location">地點：${Add}</p>
                    <p class="tel">電話：${Tel}</p>
                </div>
            </div>`;
        }

        let selectZone = []; //建立一個空陣列，加入更換select區域資料。例:選到"美濃區"存入"美濃區"資料
        let changeZone = document.querySelector('.allArea');
        selectCity.addEventListener('change',()=>{ //當select更換區域時更新
            changeZone.textContent = `${selectCity.value}`; //當區域更新下方區域名稱也會動態更新
            cards.innerHTML = ''; //一開始會顯示全區資訊，要先清空再加入更新後區域資料
            for (let j = 0; j < DataArr.length; j++) {
                let Picture1 = DataArr[j].Picture1; // 撈出所有陣列裡面Picture1(相片連結)的值
                let Name = DataArr[j].Name; // 撈出所有陣列裡面Name(名稱)的值
                let Opentime = DataArr[j].Opentime; // 撈出所有陣列裡面Opentime(開放時間)的值
                let Zone = DataArr[j].Zone; // 撈出所有陣列裡面Zone(區域)的值
                let Add = DataArr[j].Add; // 撈出所有陣列裡面Add(地點)的值
                let Tel = DataArr[j].Tel; // 撈出所有陣列裡面Tel(電話)的值
                
                if (Zone == selectCity.value) { //當Zone(區域名稱)與select值選擇相同，動態更新區域資料
                    cards.innerHTML += `
                    <div class="item">
                        <div class="img">
                            <img src="${Picture1}" alt="">
                        </div>
                        <div class="message">
                            <p class="Name">名稱：${Name}</p>
                            <p class="day">開放時間：${Opentime}</p>
                            <p class="area">地區：${Zone}</p>
                            <p class="location">地點：${Add}</p>
                            <p class="tel">電話：${Tel}</p>
                        </div>
                    </div>`;
                    selectZone.push(DataArr[j]); // 將選擇區域資料新增至陣列
                    // console.log(selectZone);
                }
            }
        });
    })
    .catch(err => (console.log(err)));


