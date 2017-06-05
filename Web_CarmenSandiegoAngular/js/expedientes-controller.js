angular.module("CarmenSandiego")

.controller("ExpedientesController", function($scope, $http) {
    $scope.title = "Expedientes";
    var url = "http://localhost:9000";
    $scope.viewData = {};

    //Get villanos
    $http.get(url + "/villanos").then(function(response) {
        $scope.villanos = response.data;
    });
    
    //Get villanos completos(para editarlos)
    $http.get(url + "/villanosCompletos").then(function(response) {
        $scope.villanosCompletos = response.data;
    });
    
    //Llamo a esta funcion para que una vez editado algun villano, los actualice
    $scope.actualizarDatos = function() {
        $http.get(url + "/villanos").then(function(response) {
            $scope.villanos = response.data;
        });
    };
    
    //Editar Villano
    $scope.editarVillano = function(villanosId) {
        $http.get(url + "/villanos/" + villanosId).then(function(response) {
            $scope.villanoSeleccionado = response.data;
        });
    };
    
    //Actualizar Villano
    $scope.actualizarVillano = function() {
        $http({
            method: 'POST',
            url: url + "/updateVillano",
            data: $scope.villanoSeleccionado ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response, status) {
            $scope.actualizarDatos();
            alert(response.data); 
        },
        function(error) {
            alert("error: " + error.data);
        });
    };
    
    //Modal borrar Villano
    $scope.borrarVillano = function(villanoABorrar) {
         $scope.villanoABorrar = villanoABorrar;
         $('#modalBorrarVillano').modal('show');
    };

    //Confirmar borrar villano
    $scope.confirmarBorrarVillano = function() {
         $http.get(url + "/deleteVillano/" + $scope.villanoABorrar.id).then(function(response) { //No andaba el 'DELETE'
            $scope.actualizarDatos();
        });
    };
    
    //Señas Particulares
    //Add Señas
    $scope.addSenia = function() {
        $scope.villanoSeleccionado.seniasParticulares.push($scope.viewData.senia);
    };
    //Borrar Señas
    $scope.borrarSenia = function(senia) {
        var index = $scope.villanoSeleccionado.seniasParticulares.indexOf(senia);
        $scope.villanoSeleccionado.seniasParticulares.splice(index, 1);
    };
    
    //Hobbies
    //Add Hobbie
    $scope.addHobbie = function() {
        $scope.villanoSeleccionado.hobbies.push($scope.viewData.hobbie);
    };
    //Borrar Hobbie
    $scope.borrarHobbie = function(hobbie) {
        var index = $scope.villanoSeleccionado.hobbies.indexOf(hobbie);
        $scope.villanoSeleccionado.hobbies.splice(index, 1);
    };
});