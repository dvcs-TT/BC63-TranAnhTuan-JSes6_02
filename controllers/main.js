// import * as jsonData from "../data/Data.json";
// let objData = JSON.parse(jsonData);
// console.log('objData: ', objData);

import objData from "../data/Data.js";
console.log("objData: ", objData);

let { navPills, tabPanes } = objData;

window.tryOut = (type, imgSrc_png) => {
  document.querySelector(`#${type}`).style.background = `url("${imgSrc_png}")`;
};

const renderNavPills = (navPillArray) => {
  document.querySelector("#pills-tab").innerHTML = navPillArray.reduce(
    (acc, value, index) => {
      return (
        acc +
        `
    <!-- navPills | ${value.tabName} -->
    <li class="nav-item" role="presentation">
      <button
        class="nav-link ${!index ? "active" : ""}"
        id="pills-${value.type}-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-${value.type}"
        type="button"
        role="tab"
        aria-controls="pills-${value.type}"
        aria-selected="${!index ? "true" : "false"}"
      >
        ${value.showName}
      </button>
    </li>
    `
      );
    },
    ""
  );
};

const renderTabContent = (navPillArray, tabPaneArray) => {
  // debugger;
  renderNavPills(navPillArray);
  document.querySelector("#pills-tabContent").innerHTML = tabPaneArray.reduce(
    (acc, value, index) => {
      return (
        acc +
        `
      <!-- Tab pane | ${value.type} -->
    <div
      class="tab-pane fade ${!index ? "show active" : ""}"
      id="pills-${value.type}"
      role="tabpanel"
      aria-labelledby="pills-${value.type}-tab"
      tabindex="0"
    >
      <!-- tab content | ${value.type} -->
      <div class="row" id="tabContent_${value.type}">
      ${tabPaneArray.filter((value) => value.type).reduce((acc, value) => {
        return (
          acc +
          `<div class="col-3">
            <div class="card text-center">
              <img
                class="card-img-top hovercard"
                src="${value.imgSrc_jpg}"
                alt="${value.name}"
              />
              <div class="card-body p-0">
                <h4 class="card-title fw-bold">${value.name}</h4>
                <button class="btn w-100" onclick="tryOut(${value.type}, ${value.imgSrc_png})">Thử đồ</button>
              </div>
            </div>
          </div>`
        );
      }, "")}
      </div>
    </div>
      `
      );
    },
    ""
  );
};

renderTabContent(navPills, tabPanes);
