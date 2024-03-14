// import & parse json data to object data
import objData from "../data/Data.json" assert { type: "json" };

let { navPills, tabPanes } = objData;

let typeArray = navPills.map(value => value.type);

window.tryOut = (type, imgSrc_png) => {
  document.querySelector(
    `#${type}`
  ).style.backgroundImage = `url("${imgSrc_png}")`;
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
  renderNavPills(navPillArray);
  document.querySelector("#pills-tabContent").innerHTML = tabPaneArray.reduce(
    (acc, value, index) => {
      const currentType = typeArray.find(
        (type, i) => index % typeArray.length === i
      );

      if (currentType) {
        return (
          acc +
          `
            <div
              class="tab-pane fade ${!index ? "show active" : ""}"
              id="pills-${currentType}"
              role="tabpanel"
              aria-labelledby="pills-${currentType}-tab"
              tabindex="0"
            >
              <div class="row" id="tabContent_${currentType}">
                ${tabPaneArray
                  .filter((value) => value.type === currentType)
                  .reduce((acc, value) => {
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
                            <button class="btn w-100" onclick="tryOut('${value.type}', '${value.imgSrc_png}')">Thử đồ</button>
                          </div>
                        </div>
                      </div>`
                    );
                  }, "")}
              </div>
            </div>
          `
        );
      }
      return acc;
    },
    ""
  );
};

renderTabContent(navPills, tabPanes);
