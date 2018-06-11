const users = [
  {
    id: 1,
    name: "Bob",
    schoolId: 101
  },
  {
    id: 2,
    name: "Bill",
    schoolId: 202
  },
];


const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 202,
    grade: 40
  },
  {
    id: 3,
    schoolId: 101,
    grade: 50
  }
];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id );
    if (user) {
      resolve(user);
    } else {
      reject(`No user found with id ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    const grade = grades.filter((grade) => grade.schoolId === schoolId );
    if (grade) {
      resolve(grade);
    } else {
      reject(`No grade found with schoolId ${schoolId}`);
    }
  });
};

const getStatus = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let averageGrade = 0;
  if(grades.length > 0){
    averageGrade = grades.map((grade) => grade.grade ).reduce((a, b) =>  a + b) / grades.length;
  }
  return `${user.name} has an average grade of ${averageGrade}%`;
}

getStatus(2).then((status) => {
  console.log('status :', status);
}).catch((error) => {
  console.log('error :', error);
});

