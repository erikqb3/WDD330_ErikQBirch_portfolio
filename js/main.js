function prepStuff() {
  let links_array = [
    {label: "Week1 notes",
    url: "Notes/Week1/story_editor.html"
    },
    {label: "Week2 notes",
    url: "Notes/Week2/codeFromReadings.html"
    },
    {label: "TestRun",
  url:"https://myheroacademia.fandom.com/wiki/List_of_Characters"}
  ];
  return links_array;
}

function addLinks() {
  let links_array = prepStuff();
  let linksList_element = document.getElementById("linksList");
  console.log(linksList_element)
  for (i=0; i<links_array.length; i++) {
    console.log(links_array[i]);
    listItem_element = document.createElement("li");
    listItem_link = document.createElement("a");
    linksList_element.appendChild(listItem_element);
    listItem_element.appendChild(listItem_link);
    listItem_link.innerHTML = links_array[i].label;
    listItem_link.href =links_array[i].url;
  }
}

function main() {
  addLinks();
}

main();