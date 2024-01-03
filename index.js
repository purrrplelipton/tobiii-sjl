window.document.addEventListener("DOMContentLoaded", async function () {
  function job(o) {
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
    const topDiv_layer1 = window.document.createElement("div");
    topDiv.appendChild(topDiv_layer1);
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
    const _position = window.document.createElement("h3");
    _position.innerHTML = position;
    topDiv_layer1.appendChild(_position);
    const topDiv_layer3 = window.document.createElement("div");
    [postedAt, contract, location].forEach(function (x) {
      const tag = window.document.createElement("span");
      tag.innerHTML = x;
      topDiv_layer3.appendChild(tag);
    });
    topDiv.appendChild(topDiv_layer3);
    const hr = window.document.createElement("hr");
    wrapper.appendChild(hr);
    const bottomDiv = window.document.createElement("div");
    const bottomDiv_tagsLayer = window.document.createElement("div");
    bottomDiv_tagsLayer.className = "bottom-div-tags-layer";
    [role, level, ...languages, ...tools].forEach(function (x) {
      const tag = window.document.createElement("span");
      tag.innerHTML = x;
      bottomDiv_tagsLayer.appendChild(tag);
    });
    bottomDiv.appendChild(bottomDiv_tagsLayer);
    wrapper.appendChild(bottomDiv);
    return li;
  }
  const listings = window.document.getElementById("listings");
  if (listings) {
    try {
      const res = await fetch("./data.json");
      if (!res.ok) {
        throw new Error("An error occured.");
      }
      const data = await res.json();
      data.forEach((d) => listings.appendChild(job(d)));
    } catch (error) {
      throw new Error(error.message);
    }
  }
});
