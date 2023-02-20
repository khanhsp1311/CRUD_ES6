// khai báo 1 mảng object kiểu Student

// lấy rồi nhúng vào html

class Student {
    constructor(id, name, age, gender) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}


let listStudent = [
    new Student(1, 'A', 20, true),
    new Student(2, 'A', 21, true),
    new Student(3, 'A', 19, true),
];


// hàm in ra danh sách sinh viên

let showStudent = (listStudent = []) => {
    let row = ``;
    listStudent.map(({ id, name, age, gender }) => { // hàm destructuring: định nghĩa thuộc tính trong phương thức
        row += // khi onclick gọ đến hàm hightlight
            `
            <tr onclick='highlightRow(${id})'>  
               <td>${id}</td>
               <td>${name}</td>
               <td>${age}</td>
               <td>${gender ? 'male' : 'female'}</td>
            </tr>
        `

    });
    document.querySelector("#studentList").innerHTML = row;

}


// hàm thêm sinh viên vào danh sách

let add = () => {
    // lấy dữ liệu từ form

    let id = document.querySelector('#txtId').value;
    let name = document.querySelector('#txtName').value;
    let age = parseInt(document.querySelector('#txtAge').value);
    let gender = document.querySelector("input[type='radio'][name='rbGender']:checked").value; // nghĩa là hai thằng cùng kiểu: thằng nào được checked sẽ lấy ra giá trị của nó
    let resultGender = gender === 'true' ? true : false;
    // kiểm tra tồn tại đối tượng trong student trước khi add
    let student = new Student(id, name, age, resultGender);
    let findResult = (s) => {
        listStudent.find((e) => {
            e.id == s;
        })

    }

    // console.log(findResult(id))'
    let check = false;
    //     listStudent.forEach(element => {

    //     console.log(typeof element.id);
    // });
    for (let i = 0; i < listStudent.length; i++) {

        if (listStudent[i].id == id) {
            check = true;
        }

    }


    if (check == false) {
        listStudent.push(student); // đẩy vào student: kiểm tra tồn tại id chưa
        showStudent(listStudent);
    } else {
        alert("Student is existed");
        document.querySelector('#txtId').focus();
    }




}


let highlightRow = (id) => { // ấn vào là hight light
    // lấy cái student theo id
    let student = listStudent.find((e) => {
        return e.id == id;
    })
    document.querySelector('#txtId').value = student.id;
    document.querySelector('#txtName').value = student.name;
    document.querySelector('#txtAge').value = student.age;

    if (student.gender === true) {
        document.querySelector('#rbGender1').checked = true;
        document.querySelector('#rbGender2').checked = false;
    } else {
        document.querySelector('#rbGender1').checked = false;
        document.querySelector('#rbGender2').checked = true;
    }

    // highlight

    // document.querySelector('#id').style = 'background-color: yellow';
}



let update = () => {
    // lấy cái id và tất cả thuộc khác để set cho nó
    // ko được set id

    let id = document.querySelector('#txtId').value;
    let name = document.querySelector('#txtName').value;
    let age = parseInt(document.querySelector('#txtAge').value);
    let gender = document.querySelector("input[type='radio'][name='rbGender']:checked").value; // nghĩa là hai thằng cùng kiểu: thằng nào được checked sẽ lấy ra giá trị của nó
    let resultGender = gender === 'true' ? true : false;
    let student = new Student(id, name, age, resultGender);

    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == student.id) {
            listStudent[i].name = student.name;
            listStudent[i].age = student.age;
            listStudent[i].gender = student.gender;
        }

    }
    showStudent(listStudent);

}


// // Hàm xóa splice 
// Đối số đầu tiên chỉ định vị trí bắt đầu thêm hoặc xóa các phần tử.
// Đối số thứ hai chỉ định số lượng phần tử cần loại bỏ.
// Các đối số thứ ba và tiếp theo là tùy chọn; họ chỉ định các phần tử được thêm vào mảng.
//var removed = array.splice(2,2);

let move = () => {
    let id = document.querySelector('#txtId').value;
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            listStudent.splice(i, 1);
        }
    }
    showStudent(listStudent);

}

let sort = () => {
    //    let listSort = listStudent.sort((a, b) => {
    //         if (a.age > b.age) {
    //             return a.age - b.age;
    //         }

    //     });
    //    listSort.forEach((e) => {
    //         console.log(e);
    //    })

    // listStudent.sort((a, b) => { 
    //     if (a.age !== b.age) { 
    //       return a.age - b.age;
    //     }
    //     if (a.gender !== b.gender) {

    //     //   console.log(a.gender.localeCompare(b.gender));
    //       return a.gender.localeCompare(b.gender);
    //     }
    //     return a.name.localeCompare(b.name);
    //   });

    listStudent.sort((a, b) => {
        if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
        }
        if (a.age !== b.age) {
            return a.age - b.age;
        }
        return a.gender.localCompare(b.gender);
    })
    showStudent(listStudent);
}

let search = () => {

    let id = document.querySelector('#txtId').value;
    let name = document.querySelector('#txtName').value;
    let age = parseInt(document.querySelector('#txtAge').value);
    let gender = document.querySelector("input[type='radio'][name='rbGender']:checked").value; // nghĩa là hai thằng cùng kiểu: thằng nào được checked sẽ lấy ra giá trị của nó
    let resultGender = gender === 'true' ? true : false;
    let student = new Student(id, name, age, resultGender);

    let searchList = [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id === student.id) {
            showStudent(listStudent[i]);
            break;
        }
        else if (listStudent[i].gender === student.gender || listStudent[i].name === student.name || listStudent[i].age === student.age) {
            searchList.push(listStudent[i]);
        }
        else if ((listStudent[i].name === student.name && listStudent[i].age === student.age)
            || (listStudent[i].name === student.name && listStudent[i].gender === student.gender)

            || (listStudent[i].name === student.name && listStudent[i].age === student.age && listStudent[i].gender === student.gender)) {

            searchList.push(listStudent[i]);
        }
        else if (listStudent[i].age === student.age && listStudent[i].gender === student.gender) {
            searchList.push(listStudent[i]);
        }



    }
    // khi search thì sẽ bỏ đi mảng cũ lấy mảng mới add vào
    // showStudent(searchList);
    // listStudent = searchList;
    showStudent(searchList);
}


showStudent(listStudent);