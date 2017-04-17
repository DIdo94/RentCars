(function () {
    function RenterController() {
        var renters = [
            { id: 1, firstName: 'firstName', lastName: 'Spoer', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 2, firstName: 'second', lastName: 'Lvhe', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 3, firstName: 'some', lastName: 'Dea', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 4, firstName: 'seco', lastName: 'Soae', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 5, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
            { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        ];

        var page = 1;
        var numberOfRecords = 1;
        this.page = page;
        this.filtered = renters.slice();
        this.numberOfRecords = numberOfRecords;
        this.renters = renters.slice();
        var filteredRenters = this.renters.slice((page - 1) * this.numberOfRecords, (page - 1) * this.numberOfRecords + this.numberOfRecords);
        this.filteredRenters = filteredRenters;

        function pageChange(pageNumber) {
            this.filteredRenters = this.filtered.slice((pageNumber - 1) * this.numberOfRecords, (pageNumber - 1) * this.numberOfRecords + this.numberOfRecords);
        }
        function filter(name) {
            this.filtered = renters.filter(function (item) {
                var itemName = name ? name : '';
                return item.lastName.toLowerCase().includes(itemName);
            });

            this.filteredRenters = this.filtered.slice((page - 1) * this.numberOfRecords, (page - 1) * this.numberOfRecords + this.numberOfRecords);
        }
        var controller = this;
        return {
            renters: this.renters,
            filtered: this.filtered,
            filteredRenters: this.filteredRenters,
            page: this.page,
            pageChange: pageChange,
            numberOfRecords: this.numberOfRecords,
            filter: filter
        };
    }
    angular
        .module('carRental.renters', [])
        .controller('RenterController', RenterController)
})();
