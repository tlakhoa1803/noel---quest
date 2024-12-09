const questions = [
  { question: "Người sáng lập triều đại nhà Nguyễn là ai?", answers: ["Nguyễn Huệ", "Nguyễn Ánh", "Nguyễn Nhạc", "Gia Long"], correct: 3, reward: 10 },
  { question: "Ai là người lãnh đạo cuộc khởi nghĩa Hai Bà Trưng?", answers: ["Trưng Trắc", "Trưng Nhị", "Lý Thường Kiệt", "Ngô Quyền"], correct: 0, reward: 10 },
  { question: "Chiến thắng Bạch Đằng năm 1288 diễn ra dưới sự chỉ huy của ai?", answers: ["Lý Thường Kiệt", "Trần Hưng Đạo", "Nguyễn Huệ", "Ngô Quyền"], correct: 1, reward: 10 },
  { question: "Đồng bằng sông Cửu Long nằm ở miền nào của Việt Nam?", answers: ["Miền Bắc", "Miền Trung", "Miền Nam", "Miền Tây"], correct: 2, reward: 20 },
  { question: "Núi Ba Na nằm ở tỉnh nào của Việt Nam?", answers: ["Lâm Đồng", "Đà Nẵng", "Quảng Nam", "Bình Định"], correct: 1, reward: 20 },
  { question: "Thủ đô của Thụy Sĩ là gì?", answers: ["Geneva", "Zurich", "Bern", "Basel"], correct: 2, reward: 20 },
  { question: "Nguyên tố nào có cấu hình electron [Ne] 3s² 3p³?", answers: ["Phospho", "Nitơ", "Magi", "Silic"], correct: 0, reward: 30 },
  { question: "Phản ứng nào sau đây là phản ứng oxi hóa khử?", answers: ["2Na + Cl2 → 2NaCl", "H2 + O2 → H2O", "CaCO3 → CaO + CO2", "CuSO4 → CuO + SO3"], correct: 1, reward: 30 },
  { question: "Nguyên tố nào có số hiệu nguyên tử là 79?", answers: ["Bạc", "Vàng", "Kẽm", "Platinum"], correct: 1, reward: 30 },
  { question: "Trong dao động cơ học, tần số dao động của con lắc đơn phụ thuộc vào yếu tố nào?", answers: ["Chiều dài của dây treo", "Khối lượng của vật", "Độ cao của vật", "Lực căng trong sợi dây"], correct: 0, reward: 40 },
  { question: "Điện trở của một dây dẫn phụ thuộc vào yếu tố nào?", answers: ["Nhiệt độ của dây", "Chiều dài của dây", "Diện tích tiết diện của dây", "Tất cả các yếu tố trên"], correct: 3, reward: 40 },
  { question: "Định luật nào phát biểu rằng 'Lực hấp dẫn tỷ lệ thuận với tích khối lượng'?", answers: ["Định luật Newton", "Định luật Hooke", "Định luật Kepler", "Định luật Coulomb"], correct: 0, reward: 40 },
  { question: "Từ nào đồng nghĩa với 'happy'?", answers: ["Sad", "Angry", "Glad", "Mad"], correct: 2, reward: 50 },
  { question: "What does the idiom 'Break the ice' mean?", answers: ["To start a conversation", "To end a relationship", "To break something physically", "To make an argument"], correct: 0, reward: 50 },
  { question: "Which of the following is the correct translation of 'The quick brown fox jumps over the lazy dog'?", answers: ["Con cáo nâu nhanh nhẹn nhảy qua con chó lười", "Con cáo chậm chạp nhảy qua con chó nhanh", "Con chó lười nhảy qua con cáo nâu nhanh nhẹn", "Con cáo nhanh chạy qua con chó"], correct: 0, reward: 50 },
  { question: "Nhà thơ nào được gọi là 'Bà chúa thơ Nôm'?", answers: ["Xuân Diệu", "Hàn Mặc Tử", "Hồ Xuân Hương", "Nguyễn Du"], correct: 2, reward: 60 },
  { question: "Ai là tác giả của tác phẩm 'Truyện Kiều'?", answers: ["Nguyễn Du", "Hồ Xuân Hương", "Tú Xương", "Nam Cao"], correct: 0, reward: 60 },
  { question: "Tác phẩm 'Đoạn tuyệt' được viết bởi ai?", answers: ["Ngô Tất Tố", "Nguyễn Minh Châu", "Vũ Trọng Phụng", "Tô Hoài"], correct: 2, reward: 60 },
  { question: "Giải phương trình 2x² - 5x + 3 = 0.", answers: ["x = 3", "x = -1", "x = 1", "x = 1/2"], correct: 2, reward: 70 },
  { question: "Tính diện tích hình tròn có bán kính bằng 7 cm. Kết quả gần đúng là bao nhiêu?", answers: ["153.94 cm²", "154.00 cm²", "150.70 cm²", "160.00 cm²"], correct: 0, reward: 70 },
  { question: "Tìm giá trị lớn nhất của biểu thức: x² - 4x + 5.", answers: ["5", "4", "1", "3"], correct: 3, reward: 70 }
];

let currentReward = 10; // Mốc reward hiện tại
let currentQuestionIndex = 0; // Chỉ số câu hỏi hiện tại
let totalScore = 0;
let gameEnded = false; // Đảm bảo trò chơi chỉ kết thúc khi hoàn thành tất cả các câu hỏi
let countdown; // Biến để lưu trạng thái đếm ngược
let timeLeft = 90; // Thời gian chơi xuyên suốt (90 giây)
function startTimer() {
  const timerElement = document.getElementById("timer");
  countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Thời gian còn lại: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      showGameOverScreen(); // Kết thúc trò chơi khi hết thời gian
    }
  }, 1000); // Cập nhật mỗi giây
}
function showGameOverScreen() {
  clearInterval(countdown); // Dừng đếm ngược nếu chưa dừng
  document.getElementById("question-box").innerHTML = ` 
    <h2>Hết thời gian! Tổng điểm của bạn là ${totalScore}.</h2>
    <p>Chúc bạn Giáng Sinh vui vẻ! 🎄</p>
    <img src="https://media.tenor.com/EkhMuwhvi-AAAAAM/dog-running.gif" alt="Giáng Sinh">
  `;
  document.getElementById("next-btn").style.display = "none"; // Ẩn nút Tiếp tục khi game over
  gameEnded = true; // Đánh dấu trò chơi đã kết thúc
}
function loadQuestion() {
  if (gameEnded) return; // Nếu trò chơi đã kết thúc thì không làm gì thêm

  // Lọc câu hỏi theo mốc reward
  const questionsWithCurrentReward = questions.filter(q => q.reward === currentReward);

  // Nếu hết câu hỏi ở mốc reward hiện tại thì kết thúc trò chơi
  if (questionsWithCurrentReward.length === 0) {
    showGameOverScreen();
    return;
  }

  // Chọn ngẫu nhiên một câu hỏi từ danh sách các câu hỏi có cùng reward
  const randomIndex = Math.floor(Math.random() * questionsWithCurrentReward.length);
  const question = questionsWithCurrentReward[randomIndex];

  // Cập nhật câu hỏi và các đáp án
  document.getElementById("question").textContent = question.question;
  const answerButtons = document.querySelectorAll(".answer-btn");
  question.answers.forEach((answer, index) => {
    answerButtons[index].textContent = answer;
    answerButtons[index].disabled = false; // Mở khóa các nút câu trả lời
  });
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none"; // Ẩn nút "Tiếp tục"

  // Cập nhật chỉ số câu hỏi hiện tại
  currentQuestionIndex = questions.indexOf(question);
}

function checkAnswer(selectedIndex) {
  if (gameEnded) return; // Nếu trò chơi đã kết thúc thì không làm gì thêm

  // Lấy câu hỏi hiện tại
  const question = questions[currentQuestionIndex];

  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((btn) => (btn.disabled = true)); // Khóa các nút sau khi chọn

  if (selectedIndex === question.correct) {
    totalScore += question.reward;
    document.getElementById("feedback").textContent = `Chính xác! Bạn nhận được ${question.reward} điểm.`;
    document.getElementById("feedback").style.color = "#28a745";
    document.getElementById("next-btn").style.display = "inline-block"; // Hiển thị nút "Tiếp tục"
  } else {
    document.getElementById("feedback").textContent = `Sai rồi! Tổng điểm của bạn là ${totalScore}.`;
    document.getElementById("feedback").style.color = "#dc3545";
    showGameOverScreen(); // Nếu sai thì dừng lại và không tiếp tục
  }
}

function nextQuestion() {
  if (gameEnded) return; // Nếu trò chơi đã kết thúc thì không làm gì thêm

  // Chuyển sang mốc reward tiếp theo
  currentReward += 10;

  loadQuestion(); // Load câu hỏi mới
  document.getElementById("next-btn").style.display = "none"; // Ẩn nút Tiếp tục sau khi câu hỏi mới
}

function showGameOverScreen() {
  document.getElementById("question-box").innerHTML = ` 
    <h2>Thất bại! Tổng điểm của bạn là ${totalScore}.</h2>
    <p>Chúc bạn Giáng Sinh vui vẻ! 🎄</p>
    <img src="https://media.tenor.com/EkhMuwhvi-AAAAAM/dog-running.gif" alt="Giáng Sinh">
  `;
  document.getElementById("next-btn").style.display = "none"; // Ẩn nút Tiếp tục khi game over
  gameEnded = true; // Đánh dấu trò chơi đã kết thúc
}

function showConfetti() {
  const confettiCanvas = document.getElementById("confetti");
  const ctx = confettiCanvas.getContext("2d");

  // Hiển thị canvas khi bắt đầu hiệu ứng pháo giấy
  confettiCanvas.style.display = "block"; // Hiển thị canvas

  // Cấu hình canvas
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  // Các tham số của pháo giấy
  const confettis = [];
  const colors = ["#FF007A", "#7A00FF", "#00FF7A", "#FFD700", "#00D4FF"];

  // Hàm tạo ra pháo giấy
  function createConfetti() {
    const confetti = {
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 5 + 2,
      rotation: Math.random() * 360
    };
    confettis.push(confetti);
  }

  // Tạo ra một lượng pháo giấy
  for (let i = 0; i < 200; i++) {
    createConfetti();
  }

  // Hàm vẽ và di chuyển pháo giấy
  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettis.forEach(confetti => {
      ctx.save();
      ctx.translate(confetti.x, confetti.y);
      ctx.rotate(confetti.rotation * Math.PI / 180);
      ctx.fillStyle = confetti.color;
      ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
      ctx.restore();

      // Cập nhật vị trí của pháo giấy
      confetti.x += confetti.speedX;
      confetti.y += confetti.speedY;

      // Nếu pháo giấy rơi ra ngoài màn hình thì xóa đi
      if (confetti.y > confettiCanvas.height) {
        confettis.splice(confettis.indexOf(confetti), 1);
      }
    });

    requestAnimationFrame(animateConfetti);
  }

  animateConfetti(); // Bắt đầu hiệu ứng pháo giấy
}

function startGame() {
  loadQuestion(); // Tải câu hỏi đầu tiên
  startTimer(); // Bắt đầu đếm ngược thời gian
}

startGame(); // Khởi chạy trò chơi
