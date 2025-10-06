// 1. HTML 요소 변수 할당 (index.html 구조 기반)
const startPage = document.querySelector('#start-page');
const qnaPage = document.querySelector('#qna-page'); 
const resultPage = document.querySelector('#result-page');
const startButton = document.querySelector('#start-btn');
const progress = document.querySelector('#progress');
const questionTitle = document.querySelector('#question-title');
const matchInfo = document.querySelector('#match-info'); 
const choiceAButton = document.querySelector('#choice-a'); 
const choiceBButton = document.querySelector('#choice-b'); 
const nextMatchButton = document.querySelector('#next-match-btn'); 
const resultTitle = document.querySelector('#result-title');
const resultImg = document.querySelector('#result-img');
const resultDesc = document.querySelector('#result-desc');
const resultAesthetic = document.querySelector('#result-aesthetic');
const restartButton = document.querySelector('#restart-btn');

// 추가된 요소
const showOthersButton = document.querySelector('#show-others-btn');
const otherGenresContainer = document.querySelector('#other-genres-container');
const genreListDiv = document.querySelector('#genre-list');
const playWinnerButton = document.querySelector('#play-winner-btn'); // 우승 장르 재생 버튼
const downloadButton = document.querySelector('#download-btn'); // 다운로드 버튼
const kakaoShareButton = document.querySelector('#kakao-share-btn'); // 카카오톡 공유 버튼
const captureElement = document.querySelector('#result-card-to-capture'); // 캡처할 영역

// 오디오 플레이어 (Audio 객체를 생성하여 관리)
const audioA = new Audio(); // Q&A A 선택지 및 결과/더보기 재생용
const audioB = new Audio(); // Q&A B 선택지 재생용

// 2. 장르/결과 데이터 정의 (미학 및 성격 분석 최종 반영)
const GENRE_DATA = {
    '덥스텝': {
        title: '🔥 덥스텝 (Dubstep)', aesthetic: '사이버펑크 (Cyberpunk)',
        description: '당신은 강렬한 감정의 표출과 힘을 추구하는 대담한 성격을 가졌습니다. 내면에 억눌린 감정이나 복잡한 생각을 육중하고 직접적인 물리적 진동을 통해 해소하려 합니다. 솔직하고 즉각적인 반응을 선호하며, 웅장하고 헤비한 미래 기술의 붕괴와 충돌에서 오는 압도감을 느낍니다.',
        image: './images/Cyberpunk.jpeg',
        song1: 'audio/dubstep_2.mp3' // 자동 재생용
    },
    '뉴로펑크': {
        title: '⚡ 뉴로펑크 (Neurofunk)', aesthetic: '바이오펑크 (Biopunk) / 포스트아포칼립스',
        description: '당신은 고도의 지적 자극과 복잡성을 선호하는 분석적이고 활동적인 성격입니다. 빠른 속도와 기계적인 정교함 속에서 몰입감을 느끼며, 복잡하게 얽힌 문제나 구조를 해결하는 데서 쾌감을 얻습니다. 신경망처럼 끊임없이 움직이는 고밀도 정보 구조에서 에너지를 얻습니다.',
        image: './images/neuropunk.jpeg',
        song1: 'audio/neurofunk_1.mp3' // 자동 재생용
    },
    '딥 하우스': {
        title: '🌙 딥 하우스 (Deep House)', aesthetic: '어반 시크(Urban Chic)',
        description: '당신은 세련된 감수성과 높은 자존감을 가진 외향적이지만 자기중심적인 성격입니다. 유행과 트렌드를 주도하며, 부드럽고 몽환적인 그루브 속에서 고급스럽고 절제된 방식으로 자신의 매력을 드러냅니다. 감정적 깊이와 우아한 분위기를 중요시합니다.',
        image: './images/deephouse.jpeg',
        song1: 'audio/deephouse_1.mp3'
    },
    'UK 개러지': {
        title: '👟 UK 개러지 (UK Garage)', aesthetic: 'Y2K (Urban Side)',
        description: '당신은 낙천적이고 사교적인 에너지를 가진 자유롭고 유쾌한 성격입니다. 엇박 리듬의 예측 불가능함 속에서 흥분과 자유를 느끼며, 주변 사람들과 활발하게 교류하는 것을 즐깁니다. 도시적인 감각과 경쾌한 리듬을 통해 스트레스를 해소합니다.',
        image: './images/ukgarage.jpeg',
        song1: 'audio/ukgarage_1.mp3'
    },
    '앰비언트': {
        title: '☁️ 앰비언트 (Ambient)', aesthetic: '리미널 포비아 (Liminal Phobia) / 드림코어(dreamcore)',
        description: '당신은 높은 개방성과 강한 내성적 성향을 가진 사색적이고 독특한 성격입니다. 낯설고 비어 있는 공간(리미널 스페이스)의 고요함 속에서 불안감과 평온함을 동시에 느끼며, 복잡한 세상으로부터 도피하여 내면의 신비로운 영역에 집중하는 것을 선호합니다.',
        image: './images/ambient.jpeg',
        song1: 'audio/ambient_1.mp3'
    },
    '덥 테크노': {
        title: '⚫ 덥 테크노 (Dub Techno)', aesthetic: '로우폴리 (Low-Poly) / PS1 aesthetic',
        description: '당신은 근면하고 성실하며 높은 집중력을 가진 내향적인 성격입니다. 단순하고 규칙적인 반복 속에서 미묘한 변화의 아름다움을 찾아내는 것을 즐깁니다. 깊은 수심처럼 차분하고 모노톤의 구조 속에서 무한히 반복되는 잔향을 통해 안정감을 얻습니다.',
        image: './images/dubtechno.jpeg',
        song1: 'audio/dubtechno_1.mp3'
    },
    '글리치 합': {
        title: '💾 글리치 합 (Glitch Hop)', aesthetic: '글리치 아트 (Glitch Art)',
        description: '당신은 틀에 얽매이지 않는 창의성과 호기심을 가진 실험적인 성격입니다. 오류를 예술의 소재로 삼으며, 예측 불가능한 왜곡 속에서 지적인 혼란을 즐깁니다. 묵직한 리듬과 파편적인 소리가 결합된 독특한 사운드를 통해 자신만의 독창성을 표현하려 합니다.',
        image: './images/glitchhop.jpeg',
        song1: 'audio/glitchhop_1.mp3'
    },
    '신스웨이브': {
        title: '📼 신스웨이브 (Synthwave)', aesthetic: '레트로퓨처리즘',
        description: '당신은 낭만주의와 강한 향수를 가진 드라마틱하고 외향적인 성격입니다. 과거의 미학을 현재로 소환하여 웅장한 서사를 꿈꿉니다. 명확한 멜로디와 화려한 전개를 선호하며, 이상적인 과거의 이미지와 감성에 쉽게 몰입하는 경향이 있습니다.',
        image: './images/synthwave.jpeg',
        song1: 'audio/synthwave_1.mp3'
    }
};

// 3. 비교 질문 데이터 (8개 질문)
const QNA_DATA = [
    {
      q: '1. 당신을 가장 강렬하게 이끄는 리듬의 속도와 질감은?',
      A: { text: '복잡하게 끊어지며 질주하는 속도감', audio: 'audio/neurofunk_1.mp3', scores: { '뉴로펑크': 3, '글리치 합': 2, '덥스텝': 1 } },
      B: { text: '일정하고 부드러우며, 안정적인 그루브', audio: 'audio/deephouse_1.mp3', scores: { '딥 하우스': 3, 'UK 개러지': 2, '덥 테크노': 1 } }
    },
    {
      q: '2. 당신을 압도하는 저음(베이스)의 존재 방식은?',
      A: { text: '묵직하게 긁히거나 울렁거리는 베이스', audio: 'audio/dubstep_1.mp3', scores: { '덥스텝': 3, '글리치 합': 2, '뉴로펑크': 1 } },
      B: { text: '잔향으로 공간을 채우는 미니멀한 울림', audio: 'audio/dubtechno_1.mp3', scores: { '덥 테크노': 3, '앰비언트': 2, '딥 하우스': 1 } }
    },
    {
      q: '3. 리듬 구성에서 어떤 스타일이 더 흥미롭나요?',
      A: { text: '엇박이 많고 톡톡 튀는, 스윙감 있는 도시적 움직임', audio: 'audio/ukgarage_1.mp3', scores: { 'UK 개러지': 3, '딥 하우스': 2 } },
      B: { text: '묵직한 디지털 오류나 쪼개지는 노이즈가 섞인 둔탁한 리듬', audio: 'audio/glitchhop_1.mp3', scores: { '글리치 합': 3, '덥스텝': 1 } }
    },
    {
      q: '4. 곡의 멜로디/화성 구성에서 더 끌리는 분위기는?',
      A: { text: '웅장하고 따뜻한 아날로그 신스 멜로디 (과거 영화 속의 감성)', audio: 'audio/synthwave_1.mp3', scores: { '신스웨이브': 3, '딥 하우스': 1 } },
      B: { text: '차갑고 신경질적인 신시사이저와 거친 기계적인 소리 (어두운 미래)', audio: 'audio/neurofunk_2.mp3', scores: { '뉴로펑크': 3, '덥스텝': 1 } }
    },
    {
      q: '5. 당신이 음악을 통해 원하는 궁극적인 감정 상태는?',
      A: { text: '미지의 공간에서 오는 고요함, 사색, 그리고 무한한 여백', audio: 'audio/ambient_1.mp3', scores: { '앰비언트': 3, '덥 테크노': 1, '딥 하우스': 1 } },
      B: { text: '몸을 강하게 치는 듯한 물리적인 충격과 압도적인 진동', audio: 'audio/dubstep_2.mp3', scores: { '덥스텝': 3, '뉴로펑크': 1, '글리치 합': 1 } }
    },
    {
      q: '6. 사운드가 만들어내는 공간의 느낌은?',
      A: { text: '잘게 썰린 보컬과 엇박이 어우러져 경쾌하게 뛰어오르는 그루브', audio: 'audio/ukgarage_2.mp3', scores: { 'UK 개러지': 3, '딥 하우스': 1 } },
      B: { text: '단순한 리듬과 소리가 반복되며 만들어내는 최면적인 경험', audio: 'audio/dubtechno_2.mp3', scores: { '덥 테크노': 3, '앰비언트': 2 } }
    },
    {
      q: '7. 멜로디 전개의 방식은?',
      A: { text: '극적인 멜로디 전개와 아날로그 신스로 만들어내는 화려한 빌드업', audio: 'audio/synthwave_2.mp3', scores: { '신스웨이브': 3, '글리치 합': 1 } },
      B: { text: '물결처럼 부드럽게 흐르며 몸을 감싸는 듯한 몽환적인 감각', audio: 'audio/deephouse_2.mp3', scores: { '딥 하우스': 2, '앰비언트': 2 } }
    },
    {
      q: '8. 비트 위에서 느껴지는 움직임의 특성은?',
      A: { text: '질주하고, 날카로우며, 금속성 소리가 튀는 기계적인 움직임', audio: 'audio/neurofunk_2.mp3', scores: { '뉴로펑크': 3, '글리치 합': 2 } },
      B: { text: '잔향이 길게 남는 끝없는 울림의 공간, 리듬보다 질감', audio: 'audio/ambient_2.mp3', scores: { '앰비언트': 3, '덥 테크노': 1 } }
    }
];

// 4. 테스트 진행 변수
let qnaIndex = 0;
let scores = {};
let selectedChoice = null; 
let currentMatchData = null; 


// 5. 오디오 및 UI 헬퍼 함수

/**
 * 오디오를 부드럽게 페이드 아웃하며 정지시키는 함수 (오디오 중첩 문제 FIX)
 * *오디오 정지는 즉시 이루어집니다.*
 */
function fadeOutAndStop(audio) {
    if (audio.paused && audio.volume === 1) return; 

    // 즉시 정지 및 초기화
    if (!audio.paused) {
        audio.pause();
    }
    audio.currentTime = 0;
    audio.volume = 1;
}

/**
 * 선택 상태를 저장하고 UI를 업데이트합니다.
 */
function selectChoice(choice) {
    selectedChoice = choice;

    // 선택 버튼 하이라이트
    choiceAButton.classList.remove('selected');
    choiceBButton.classList.remove('selected');
    
    const selectedButton = choice === 'A' ? choiceAButton : choiceBButton;
    selectedButton.classList.add('selected');

    // 다음 버튼 활성화
    nextMatchButton.disabled = false;
    nextMatchButton.classList.remove('disabled');
}

/**
 * 특정 트랙의 재생/정지 상태를 토글하는 함수 (결과 페이지 및 더보기 버튼 전용)
 * @param {HTMLButtonElement} button 재생/정지 버튼 요소
 * @param {string} trackPath 재생할 오디오 파일 경로
 */
function toggleTrackPlayback(button, trackPath) {
    // 1. 오디오B (Q&A B 트랙) 정지
    fadeOutAndStop(audioB);
    
    // 2. 현재 오디오A가 재생 중이고, 경로가 같은지 확인 (정지 로직)
    if (!audioA.paused && audioA.src.endsWith(trackPath)) {
        fadeOutAndStop(audioA);
        button.textContent = '▶ 재생';
        return;
    }

    // 3. 재생 로직 (모든 버튼 텍스트 초기화 후 재생)
    if (playWinnerButton) playWinnerButton.textContent = '▶ 우승 장르 재생';
    genreListDiv.querySelectorAll('.play-other-btn').forEach(btn => btn.textContent = '▶ 재생');

    audioA.src = trackPath;
    audioA.currentTime = 0;
    audioA.play().then(() => {
        button.textContent = '■ 정지';
    }).catch(e => {
        console.error("Audio playback failed or blocked:", e);
        button.textContent = '▶ 재생';
        // 모바일 자동 재생 차단 시, 버튼을 다시 누르도록 유도
        if (button === playWinnerButton) {
            alert("음악 자동 재생이 차단되었습니다. [▶ 우승 장르 재생] 버튼을 눌러 재생해주세요.");
        }
    });
}


// 6. 페이지 전환 및 테스트 로직

/**
 * 게임 시작 함수 (Restart 시에도 호출됨)
 */
function startGame() {
    qnaIndex = 0;
    scores = { 
        '덥스텝': 0, '뉴로펑크': 0, '딥 하우스': 0, 'UK 개러지': 0, 
        '앰비언트': 0, '덥 테크노': 0, '글리치 합': 0, '신스웨이브': 0
    };
    
    // 페이지 전환: 시작 -> Q&A
    startPage.classList.remove('active');
    resultPage.classList.remove('active'); 
    qnaPage.classList.add('active'); 
    
    // 초기 상태: 다음 버튼 비활성화
    nextMatchButton.disabled = true;
    nextMatchButton.classList.add('disabled');
    
    // 오디오 정지
    fadeOutAndStop(audioA);
    fadeOutAndStop(audioB);

    loadQuestion();
}

/**
 * 다음 질문을 로드하거나 결과를 표시합니다.
 */
function loadQuestion() {
    // 1. 선택 상태 및 UI 리셋
    selectedChoice = null;
    choiceAButton.classList.remove('selected');
    choiceBButton.classList.remove('selected');
    nextMatchButton.disabled = true;
    nextMatchButton.classList.add('disabled');
    
    // 오디오 안전하게 정지 및 리셋
    fadeOutAndStop(audioA);
    fadeOutAndStop(audioB);


    // 2. 현재 질문 확인
    if (qnaIndex >= QNA_DATA.length) {
        goResult();
        return;
    }

    const currentQ = QNA_DATA[qnaIndex];
    currentMatchData = currentQ; // 점수 계산을 위해 현재 질문 데이터 저장
    
    questionTitle.textContent = currentQ.q;
    matchInfo.textContent = `(${QNA_DATA.length}개 중 ${qnaIndex + 1}번째 질문) 두 소리 중 더 끌리는 쪽을 선택하고, [다음 질문] 버튼을 눌러주세요. (장르 이름은 숨겨집니다)`;

    // A/B 선택지 업데이트
    choiceAButton.querySelector('.genre-name').textContent = '선택 A';
    choiceAButton.querySelector('.song-name').textContent = currentQ.A.text;
    audioA.src = currentQ.A.audio;

    choiceBButton.querySelector('.genre-name').textContent = '선택 B';
    choiceBButton.querySelector('.song-name').textContent = currentQ.B.text;
    audioB.src = currentQ.B.audio;
    
    // 3. 진행도 업데이트
    progress.style.width = ((qnaIndex + 1) / QNA_DATA.length) * 100 + '%';
}

/**
 * 다음 버튼 클릭 시 호출되어, 점수를 계산하고 다음 질문으로 넘어갑니다.
 */
function advanceMatch() {
    if (!selectedChoice) {
        alert('먼저 소리를 듣고 마음에 드는 선택지를 골라주세요!');
        return;
    }

    // 1. 오디오 안전하게 정지
    fadeOutAndStop(audioA);
    fadeOutAndStop(audioB);

    // 2. 점수 적용 (차등 점수 로직)
    const currentQ = QNA_DATA[qnaIndex]; 
    const scoreChanges = selectedChoice === 'A' ? currentQ.A.scores : currentQ.B.scores;

    for (const genre in scoreChanges) {
        if (scores.hasOwnProperty(genre)) { 
             scores[genre] += scoreChanges[genre];
        }
    }
    
    // 3. 다음 질문으로 진행
    qnaIndex++;
    loadQuestion();
}

/**
 * 최종 결과를 표시합니다.
 */
function goResult() {
    qnaPage.classList.remove('active');
    resultPage.classList.add('active');

    // 1. 가장 높은 점수를 얻은 장르 결정
    let maxScore = -Infinity;
    let finalType = '앰비언트';

    for (const genre in scores) {
        if (scores[genre] > maxScore) {
            maxScore = scores[genre];
            finalType = genre;
        }
    }

    // 2. 결과 화면 업데이트 (HTML 요소에 데이터 쓰기)
    const result = GENRE_DATA[finalType];
    
    if (resultTitle) resultTitle.textContent = result.title;
    if (resultImg) resultImg.src = result.image;
    if (resultAesthetic) resultAesthetic.textContent = `연상 디자인 미학: ${result.aesthetic}`;
    if (resultDesc) resultDesc.textContent = result.description;
    
    // 3. '다른 장르 더 보기' 섹션 채우기
    populateOtherGenres(finalType);
    
    // 4. 우승 장르 버튼 상태 초기화 및 자동 재생 시도
    playWinnerButton.dataset.genre = finalType; 
    playWinnerButton.textContent = '▶ 우승 장르 재생'; 

    // 자동 재생 시작 (toggleTrackPlayback 함수를 호출하여 재생 상태를 관리)
    toggleTrackPlayback(playWinnerButton, result.song1); 
}

/**
 * 최종 결과 외 다른 장르의 정보를 동적으로 채우는 함수
 */
function populateOtherGenres(winningGenre) {
    if (!genreListDiv) return; // 요소가 없으면 실행 중지
    
    genreListDiv.innerHTML = '';
    
    for (const [genreName, data] of Object.entries(GENRE_DATA)) {
        if (genreName !== winningGenre) {
            const item = document.createElement('div');
            item.className = 'other-genre-item'; 
            item.innerHTML = `
                <div class="other-genre-content">
                    <h4>${data.title} (${data.aesthetic})</h4>
                    <p class="description-small">${data.description}</p>
                </div>
                <button class="play-other-btn" data-genre="${genreName}">▶ 재생</button>
            `;
            genreListDiv.appendChild(item);
        }
    }
    
    // 동적으로 생성된 버튼에 이벤트 리스너 연결
    genreListDiv.querySelectorAll('.play-other-btn').forEach(button => {
        const genre = button.dataset.genre;
        button.addEventListener('click', () => {
            toggleTrackPlayback(button, GENRE_DATA[genre].song1);
        });
    });
}


/**
 * 다시 하기 버튼 로직 (Restart)
 */
function handleRestart() {
    // 1. 오디오 정지
    fadeOutAndStop(audioA);
    fadeOutAndStop(audioB);

    // 2. 페이지 전환: 결과 페이지 -> 시작 페이지
    resultPage.classList.remove('active');
    startPage.classList.add('active'); 
    
    // 3. 추가 정보 섹션 숨기기
    if (otherGenresContainer) otherGenresContainer.style.display = 'none';
    if (showOthersButton) showOthersButton.textContent = '다른 장르 더 보기'; 
}


// 7. 이벤트 리스너 연결 및 오디오 재생 로직
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', handleRestart); 
nextMatchButton.addEventListener('click', advanceMatch); 
if (downloadButton) downloadButton.addEventListener('click', handleDownload);
if (kakaoShareButton) kakaoShareButton.addEventListener('click', handleKakaoShare);

// A 버튼 클릭: 오디오 A 재생 및 선택 상태 설정
choiceAButton.addEventListener('click', () => {
    // 오디오 B 정지 (Q&A B 트랙)
    fadeOutAndStop(audioB);
    // 오디오 A 정지 (결과/더보기 트랙)
    fadeOutAndStop(audioA); 
    
    audioA.currentTime = 0;
    audioA.play(); 
    selectChoice('A');
});

// B 버튼 클릭: 오디오 B 재생 및 선택 상태 설정
choiceBButton.addEventListener('click', () => {
    // 오디오 A 정지 (Q&A A 트랙 및 결과/더보기 트랙)
    fadeOutAndStop(audioA); 
    // 오디오 B 정지
    fadeOutAndStop(audioB);
    
    audioB.currentTime = 0;
    audioB.play();
    selectChoice('B');
});

// 우승 장르 재생 버튼 연결 (토글 기능)
if (playWinnerButton) {
    playWinnerButton.addEventListener('click', () => {
        const genreName = playWinnerButton.dataset.genre;
        const trackPath = GENRE_DATA[genreName]?.song1;
        
        // 오디오 B 정지
        fadeOutAndStop(audioB);

        // 다른 장르 버튼 텍스트 초기화
        genreListDiv.querySelectorAll('.play-other-btn').forEach(btn => btn.textContent = '▶ 재생');
        
        // 재생 시작 (audioA 사용)
        toggleTrackPlayback(playWinnerButton, trackPath);
    });
}

// '다른 장르 더 보기' 버튼 로직 (토글 기능)
if (showOthersButton) {
    showOthersButton.addEventListener('click', () => {
        if (otherGenresContainer) {
            // 오디오 중지 
            fadeOutAndStop(audioA); 
            fadeOutAndStop(audioB);
            
            // 재생 버튼 텍스트 초기화
            if (playWinnerButton) playWinnerButton.textContent = '▶ 우승 장르 재생';
            genreListDiv.querySelectorAll('.play-other-btn').forEach(btn => btn.textContent = '▶ 재생');

            otherGenresContainer.style.display = otherGenresContainer.style.display === 'none' ? 'block' : 'none';
            showOthersButton.textContent = otherGenresContainer.style.display === 'none' ? '다른 장르 더 보기' : '숨기기';
        }
    });
}

// 페이지 로드 시 초기 화면만 활성화 보장
document.addEventListener('DOMContentLoaded', () => {
    qnaPage.classList.remove('active');
    resultPage.classList.remove('active');
    startPage.classList.add('active');
});

// ***************************************************
// ********* 새로운 기능 (다운로드/공유) ***************
// ***************************************************

/**
 * 이미지 다운로드 함수 (html2canvas 필요)
 */
function handleDownload() {
    if (!window.html2canvas) {
        alert('이미지 다운로드 라이브러리(html2canvas)가 로드되지 않았습니다! HTML을 확인해주세요.');
        return;
    }
    
    if (captureElement) {
        window.scrollTo(0, 0); 
        
        html2canvas(captureElement, { scale: 2, useCORS: true, logging: false }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            const winnerTitle = resultTitle.textContent.replace(/[^\w\sㄱ-힣]/g, ''); 
            
            link.download = `${winnerTitle}_취향카드.png`;
            link.href = imgData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

/**
 * 카카오톡 공유 함수 (KakaoTalk SDK 필요)
 */
function handleKakaoShare() {
    if (!window.Kakao || !Kakao.isInitialized()) {
        alert('카카오 SDK가 로드되지 않았거나 초기화되지 않았습니다! (HTML head 태그를 확인해주세요)');
        return;
    }

    const winner = resultTitle.textContent;
    const aesthetic = resultAesthetic.textContent;
    // 결과 이미지의 절대 경로 (운영 환경에 따라 수정 필요)
    const imageURL = window.location.origin + window.location.pathname.replace('index.html', '') + resultImg.src; 

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `나의 최종 음악 취향은 ${winner}입니다!`,
            description: `${aesthetic}. 자세한 성격 분석 결과를 확인해보세요.`,
            imageUrl: imageURL,
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
        buttons: [
            {
                title: '결과 확인하기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        ],
    });
}




