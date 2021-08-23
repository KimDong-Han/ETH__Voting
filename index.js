
  
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))//CLI쓸떈 8545, GUI쓸때는 7545로 변경 필수
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

contract = new web3.eth.Contract(abi);
contract.options.address = '0xcdf692c0eedb478904670734028204390fc1b4de';
// 무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   무조건바꿔야함   

candidates = {"KIM": "candidate-1", "JEON": "candidate-2", "WOO": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);
 
 contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
  let div_id = candidates[candidateName];
 
  contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
   $("#" + div_id).html(f);
    location.reload();
  })
 })
}

$(document).ready(function() {
   
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];
 
 let dkk = document.getElementById(candidates[name])
 contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
  $("#"+candidates[name]).html(f);
  
 })
 }
  
});

new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["문재인", "홍준표"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [8000,7000]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: false,
        text: '득표율 현황판'
        
      },
      scales: {
        yAxes: [{
        ticks: {
          display: false
        }
      }]
    }
    }
});


