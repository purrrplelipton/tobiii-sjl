window.document.addEventListener("DOMContentLoaded", async function () {
  let selectedFilters = [];
  const _selectedFilters = window.document.querySelector("#filters-bar div");
  function updateSelectedFilters() {
    _selectedFilters.innerHTML = "";
    selectedFilters.forEach(function (f) {
      const filter = window.document.createElement("div");
      const removeBtn = window.document.createElement("button");
      removeBtn.type = "button";
      removeBtn.setAttribute("data-value", f);
      removeBtn.ariaLabel = `remove filter: ${f}`;
      removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>`;
      const filterValue = window.document.createElement("span");
      filterValue.innerHTML = f;
      [filterValue, removeBtn].forEach(function (el) {
        filter.appendChild(el);
      });
      _selectedFilters.appendChild(filter);
    });
  }
  window.document
    .querySelector("#filters-bar button")
    .addEventListener("click", function () {
      selectedFilters = [];
      updateSelectedFilters();
    });
  _selectedFilters.querySelectorAll("button").forEach(function (btn) {
    const value = btn.getAttribute("data-value");
    const updatedFilters = selectedFilters.filter((f) => f !== value);
    selectedFilters = [...updatedFilters];
  });
  function jobFilter(o) {
    const params = [o.role, o.level, ...o.languages, ...o.tools];
    return selectedFilters.every(function (f) {
      return params.includes(f);
    });
  }
  function createJob(o) {
    const {
      company,
      logo,
      new: isNew,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = o;
    const li = window.document.createElement("li");
    const wrapper = window.document.createElement("div");
    wrapper.setAttribute("data-featured", featured);
    li.appendChild(wrapper);
    const topDiv = window.document.createElement("div");
    topDiv.className = "top-div";
    const imgWrapper = window.document.createElement("div");
    imgWrapper.className = "company-logo-wrapper";
    const img = window.document.createElement("img");
    img.setAttribute("src", logo);
    img.setAttribute("alt", `logo of a company called ${company}`);
    img.setAttribute("loading", "lazy");
    imgWrapper.appendChild(img);
    topDiv.appendChild(imgWrapper);
    const logoSibling = window.document.createElement("div");
    logoSibling.className = "job-details";
    const topDiv_layer1 = window.document.createElement("div");
    topDiv_layer1.className = "top-div-layer1";
    logoSibling.appendChild(topDiv_layer1);
    topDiv.appendChild(logoSibling);
    const _company = window.document.createElement("h2");
    _company.innerHTML = company;
    topDiv_layer1.appendChild(_company);
    const layer1_tagsDiv = window.document.createElement("div");
    layer1_tagsDiv.className = "top-div-tags";
    topDiv_layer1.appendChild(layer1_tagsDiv);
    if (isNew) {
      const new_tag = window.document.createElement("span");
      new_tag.setAttribute("class", "isNew");
      new_tag.innerHTML = "NEW!";
      layer1_tagsDiv.appendChild(new_tag);
    }
    if (featured) {
      const featured_tag = window.document.createElement("span");
      featured_tag.setAttribute("class", "isFeatured");
      featured_tag.innerHTML = "FEATURED";
      layer1_tagsDiv.appendChild(featured_tag);
    }
    wrapper.appendChild(topDiv);
    const _position = window.document.createElement("button");
    _position.type = "button";
    _position.innerHTML = position;
    logoSibling.appendChild(_position);
    const topDiv_layer3 = window.document.createElement("div");
    topDiv_layer3.className = "top-div-layer3";
    [postedAt, contract, location].forEach(function (x) {
      const tag = window.document.createElement("span");
      tag.innerHTML = x;
      topDiv_layer3.appendChild(tag);
    });
    logoSibling.appendChild(topDiv_layer3);
    const hr = window.document.createElement("hr");
    wrapper.appendChild(hr);
    const bottomDiv = window.document.createElement("div");
    const bottomDiv_tagsLayer = window.document.createElement("div");
    bottomDiv_tagsLayer.className = "bottom-div-tags-layer";
    [role, level, ...languages, ...tools].forEach(function (x) {
      const tag = window.document.createElement("button");
      tag.setAttribute("data-value", x);
      tag.type = "button";
      tag.innerHTML = x;
      bottomDiv_tagsLayer.appendChild(tag);
    });
    bottomDiv.appendChild(bottomDiv_tagsLayer);
    wrapper.appendChild(bottomDiv);
    return li;
  }
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("An error occured.");
    }
    const data = await res.json();
    if (data) {
      const listings = window.document.getElementById("listings");
      const fltrBtns = window.document.querySelectorAll(
        ".bottom-div-tags-layer button"
      );
      console.log(fltrBtns);
      fltrBtns.forEach(function (tag) {
        tag.addEventListener("click", function (e) {
          const value = e.target.getAttribute("data-value");
          if (!selectedFilters.includes(value)) {
            selectedFilters.push(value);
            console.log("Selected Filters:", selectedFilters);
            updateSelectedFilters();
          }
        });
      });
      if (listings) {
        data.forEach(function (o) {
          if (jobFilter(o)) listings.appendChild(createJob(o));
        });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
