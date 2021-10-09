var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        defaultSortOrder: 1,
        searchString: '',
        backUp: [],
        posts: [],
        employees: [
            {
                "emp_id": 4,
                "emp_name": "a"
            },
            {
                "emp_id": 2,
                "emp_name": "b"
            },
            {
                "emp_id": 3,
                "emp_name": "c"
            },
            {
                "emp_id": 1,
                "emp_name": "d"
            }
        ]
    },
    mounted: function () {
        this.fetchData();
      },
    methods: {
        searchEmployee: function () {
            this.backUp = [...this.employees];
            if (this.searchString) {
                var emp = this.employees.filter(x => (x.emp_id == parseInt(this.searchString) || x.emp_name === this.searchString));
                var post = this.posts.filter(y => y.id == parseInt(this.searchString));

                if (emp && post) {
                    this.employees = [];
                    this.posts = [];

                    this.employees = [...this.employees, ...emp];
                    this.posts = [...this.posts, ...post];
                } 
            } else {
                this.employees = [];
                this.employees = [...this.employees, ...this.backUp];
                this.fetchData();
            }

        },
        sortByKey: function (array, key) {
            if (this.defaultSortOrder) {
                this.defaultSortOrder = !this.defaultSortOrder;
                return this.employees.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            } else {
                this.defaultSortOrder = !this.defaultSortOrder;
                return this.employees.sort((a, b) => (a[key] > b[key]) ? -1 : 1);
            }
        },
        sortEmployee: function (key) {
            let sortedEmp = this.sortByKey(this.employees, key);
            this.employees = [];
            sortedEmp.forEach(element => {
                this.employees.push(element);
            });
        },
        fetchData: function (params) {
            // fetch('https://jsonplaceholder.typicode.com/posts')
            //     .then((resp) => {
            //         resp.forEach(x => this.posts.push(x));
            //     })
             this.posts = [];
             let self = this;
                $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
                    data.forEach(x => self.posts.push(x));
                });
        }
    },
})






// TS FILE

sortTable(data: any, key: any) {
    if (this.defaultSortOrder) {
      this.defaultSortOrder = !this.defaultSortOrder;
      return data.sort((a: any, b: any) => (a[key] > b[key]) ? 1 : -1);
    } else {
      this.defaultSortOrder = !this.defaultSortOrder;
      return data.sort((a: any, b: any) => (a[key] > b[key]) ? -1 : 1);
    }
  }

  sortEmp(key: any) {
    let sortedData = this.sortTable(this.srfExtension, key);
    this.srfExtension = [];
    sortedData.forEach((ext: any) => {
      this.srfExtension.push(ext);
    });
  }
