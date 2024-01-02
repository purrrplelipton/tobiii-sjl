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
    const div = window.document.createElement("div");
    li.appendChild(div);
    const img = window.document.createElement("img");
    img.setAttribute("src", logo);
    img.setAttribute("alt", `logo of a company called ${company}`);
    img.setAttribute("loading", "lazy");
    div.appendChild(img);
    const div2 = window.document.createElement("div");
    li.appendChild(div2);
    const _company = window.document.createElement("h2");
    _company.innerHTML = company;
    div2.appendChild(_company);
    const div3 = window.document.createElement("div");
    div2.appendChild(div3);
    if (isNew) {
      const new_tag = window.document.createElement("span");
      new_tag.setAttribute("class", "isNew");
      new_tag.innerHTML = "NEW!";
      div3.appendChild(new_tag);
    }
    if (featured) {
      const featured_tag = window.document.createElement("span");
      featured_tag.setAttribute("class", "isFeatured");
      featured_tag.innerHTML = "FEATURED";
      div3.appendChild(featured_tag);
    }
    div.appendChild(div2);
    const _position = window.document.createElement("h3");
    _position.innerHTML = position;
    div.appendChild(_position);
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
