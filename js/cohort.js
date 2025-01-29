$(document).ready(() => {
  parseCsv();
});

let datalines = [];
let currentPage = 1;

const itemsPerPage = 12;

function parseCsv() {
  $.ajax({
    url: "../data/temp.csv",
    method: "GET",
    type: "text",
  })
    .then(function (data) {
      const { data: lines } = Papa.parse(data);
      datalines = lines.slice(1);
      lines.slice(1).map((line, _0) => {
        const [_1, _2, first, last, major, bio, linkedin] = line;
        $(".bios").append(makeCard(bio, linkedin, first, last,  major));
      });
    })
    .catch(function (data) {
      console.log("failed", data);
    });
}

function makeCard(bio, linkedin, first, last,  major) {
    let img = "../imgs/Cohort12/" + last + ".jpg"
    let name = first + " " + last
    return `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card">
            <img src="${img}" class="card-img-top bio-img" alt="bio">
            <div class="card-body">
              <h5 class="card-title">${name} <a href=${linkedin} target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg></a></h5>
              
              <p class="card-text">${major}</p>
              
              <div style="height: 250; overflow-y: auto;">
                <p class="card-text">${bio}</p>
              </div>
            </div>
          </div>
        </div>
      `
}
