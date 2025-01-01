// ข้อมูล
const exercises = [
     { name: 'วิ่งเหยาะๆ', description: 'เริ่มต้นด้วยการวิ่งเบาๆ 15-20 นาที' },
     { name: 'โยคะ', description: 'ท่าพื้นฐาน เช่น ท่าสุนัขก้มหน้า ท่าภูเขา' },
     { name: 'ว่ายน้ำ', description: 'ว่ายน้ำท่าฟรีสไตล์ 30 นาที' }
 ];
 
 const foods = [
     { name: 'สลัดไก่', allergens: ['ถั่ว'], calories: 350 },
     { name: 'ข้าวกล้องแกงเขียวหวาน', allergens: ['นม'], calories: 400 },
     { name: 'ผัดผักรวม', allergens: [], calories: 200 }
 ];
 
 // หน้า Index
 if (document.getElementById('registerForm')) {
     document.getElementById('registerForm').addEventListener('submit', (e) => {
         e.preventDefault();
         const userData = {
             name: document.getElementById('name').value,
             weight: document.getElementById('weight').value,
             height: document.getElementById('height').value,
             birthdate: document.getElementById('birthdate').value
         };
         localStorage.setItem('userData', JSON.stringify(userData));
         window.location.href = 'homepage.html';
     });
 }
 
 // หน้า Home
 if (document.getElementById('exerciseList')) {
     // แสดงท่าออกกำลังกาย
     const exerciseList = document.getElementById('exerciseList');
     exercises.forEach(exercise => {
         const div = document.createElement('div');
         div.className = 'exercise-item';
         div.innerHTML = `
             <h3>${exercise.name}</h3>
             <p>${exercise.description}</p>
         `;
         exerciseList.appendChild(div);
     });
 
     // ระบบแพ้อาหาร
     const allergyButtons = document.getElementById('allergyButtons');
     const allergies = ['ถั่ว', 'นม', 'ไข่'];
     let selectedAllergies = [];
 
     allergies.forEach(allergy => {
         const button = document.createElement('button');
         button.className = 'allergy-btn';
         button.textContent = allergy;
         button.onclick = () => toggleAllergy(allergy, button);
         allergyButtons.appendChild(button);
     });
 
     function toggleAllergy(allergy, button) {
         if (selectedAllergies.includes(allergy)) {
             selectedAllergies = selectedAllergies.filter(a => a !== allergy);
             button.classList.remove('active');
         } else {
             selectedAllergies.push(allergy);
             button.classList.add('active');
         }
         updateFoodList();
     }
 
     function updateFoodList() {
         const foodList = document.getElementById('foodList');
         foodList.innerHTML = '';
         
         foods.filter(food => 
             !food.allergens.some(allergen => selectedAllergies.includes(allergen))
         ).forEach(food => {
             const div = document.createElement('div');
             div.className = 'food-item';
             div.innerHTML = `
                 <h3>${food.name}</h3>
                 <p>${food.calories} แคลอรี่</p>
             `;
             foodList.appendChild(div);
         });
     }
 
     updateFoodList();
 }
 
 // หน้า Profile
 if (document.getElementById('weightChart')) {
     const weights = JSON.parse(localStorage.getItem('weights') || '[]');
     const ctx = document.getElementById('weightChart').getContext('2d');
     
     const chart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: weights.map(w => w.date),
             datasets: [{
                 label: 'น้ำหนัก (กก.)',
                 data: weights.map(w => w.weight),
                 borderColor: '#89A8B2',
                 tension: 0.1
             }]
         }
     });
 
     window.updateWeight = () => {
         const newWeight = document.getElementById('newWeight').value;
         if (newWeight) {
             const date = new Date().toLocaleDateString('th-TH');
             weights.push({ date, weight: Number(newWeight) });
             localStorage.setItem('weights', JSON.stringify(weights));
             chart.data.labels.push(date);
             chart.data.datasets[0].data.push(Number(newWeight));
             chart.update();
             document.getElementById('newWeight').value = '';
         }
     };
 }
 
 // ระบบออกจากระบบ
 if (document.getElementById('logoutBtn')) {
     document.getElementById('logoutBtn').onclick = () => {
         window.location.href = 'index.html';
     };
 }
 document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
        name: document.getElementById('name').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        birthdate: document.getElementById('birthdate').value
    };
    
    // บันทึกข้อมูลผู้ใช้
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // เพิ่มน้ำหนักเริ่มต้นในประวัติ
    const weights = [];
    weights.push({
        date: new Date().toLocaleDateString('th-TH'),
        weight: Number(userData.weight)
    });
    localStorage.setItem('weights', JSON.stringify(weights));
    
    // นำทางไปยัง profile.html
    window.location.href = 'profile.html';
});
document.getElementById('registerForm').addEventListener('submit', (e) => {
     e.preventDefault();
     const userData = {
         name: document.getElementById('name').value,
         weight: document.getElementById('weight').value,
         height: document.getElementById('height').value,
         birthdate: document.getElementById('birthdate').value
     };
     
     // บันทึกข้อมูลผู้ใช้
     localStorage.setItem('userData', JSON.stringify(userData));
     
     // เพิ่มน้ำหนักเริ่มต้นในประวัติ
     const weights = [];
     weights.push({
         date: new Date().toLocaleDateString('th-TH'),
         weight: Number(userData.weight)
     });
     localStorage.setItem('weights', JSON.stringify(weights));
     
     // นำทางไปหน้า home
     window.location.href = 'homepage.html';
 });