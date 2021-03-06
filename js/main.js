function prepStuff() {
  let links_array = [
    {label: "Week1 notes",
    url: "Notes/Week1/story_editor.html"
    },
    {label: "Week2 notes",
    url: "Notes/Week2/codeFromReadings.html"
    },
    {label: "Week3 notes",
    url: "Notes/Week3/Week3_notes.html"
    },
    {label: "Week4 notes",
    url: "Notes/Week4/Week4_notes.html"
    },
    {label: "Week5 notes",
    url: "Notes/Week5/Week5_notes.html"
    },
    {label: "Week6 Midterm Checkin",
    url: "Notes/Week5/ChallengeOne/ToDo.html"
    },
    {label: "Week7 notes",
    url: "Notes/Week7/W7_notes.html"
    },
    {label: "Week8 notes",
    url: "Notes/Week8/W8_notes.html"
    },
    {label: "Week9 notes",
    url: "Notes/Week9/W9_notes.html"
    },
    {label: "Week10 notes",
    url: "Notes/Week10/W10_notes.html"
    },
    {label: "Final Project",
  url:"FinalProject/views/index.html"}
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