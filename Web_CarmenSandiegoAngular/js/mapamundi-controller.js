angular.module("CarmenSandiego")

.controller("MapamundiController", function($scope, $http) {
    $scope.title = "Mapamundi";
    var url = "http://localhost:9000";
    $scope.viewData = {};

    //Get paises tabla
    $http.get(url + "/paises").then(function(response) {
        $scope.paises = response.data;
    });

    //Get paises completos(para select conexiones)
    $http.get(url + "/paisesCompletos").then(function(response) {
        $scope.paisesCompletos = response.data;
    });

    //Llamo a esta funcion para que una vez editado algun pais, los actualice
    $scope.actualizarDatos = function() {
        $http.get(url + "/paises").then(function(response) {
            $scope.paises = response.data;
        });
    };

    //Editar Pais
    $scope.editarPais = function(paisId) {
        $http.get(url + "/paises/" + paisId).then(function(response) {
            $scope.paisSeleccionado = response.data;
        });
    };

    //Actualizar Pais
    $scope.actualizarPais = function() {
        $http({
            method: 'POST',
            url: url + "/updatePais",
            data: $scope.paisSeleccionado ,
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

    //Modal borrar Pais
    $scope.borrarPais = function(paisABorrar) {
         $scope.paisABorrar = paisABorrar;
         $('#modalBorrarPais').modal('show');
    };

    //Confirmar borrar pais
    $scope.confirmarBorrarPais = function() {
         $http.get(url + "/deletePais/" + $scope.paisABorrar.id).then(function(response) { //No andaba el 'DELETE'
            $scope.actualizarDatos();
        });
    };

    //Caracteristicas
    //Add Caracteristica
    $scope.addCaract = function() {
        $scope.paisSeleccionado.caracteristicas.push($scope.viewData.caracteristica);
    };
    //Borrar Caracteristica
    $scope.borrarCaracteristica = function(caract) {
        var index = $scope.paisSeleccionado.caracteristicas.indexOf(caract);
        $scope.paisSeleccionado.caracteristicas.splice(index, 1);
    };

    //Conexiones
    //Add Conexion
    $scope.addConexion = function() {
        $scope.paisSeleccionado.conexiones.push($scope.viewData.conexion);
    };
    //Borrar Conexion
    $scope.borrarConexion = function(conexion) {
        var index = $scope.paisSeleccionado.conexiones.indexOf(conexion);
        $scope.paisSeleccionado.conexiones.splice(index, 1);
    };

    //Lugares de interes
    //Add Lugar de interes
    $scope.addLugar = function() {
        $scope.paisSeleccionado.lugaresDeInteres.push($scope.viewData.lugar);
    };
    //Borrar Lugar de interes
    $scope.borrarLugar = function(lugar) {
        var index = $scope.paisSeleccionado.lugaresDeInteres.indexOf(lugar);
        $scope.paisSeleccionado.lugaresDeInteres.splice(index, 1);
    };

});


//Confirmar borrar pais
    //$scope.confirmarBorrarPais = function() {
        // $http({
        //     method: 'DELETE',
        //     url: url + "/paises",
        //     data: {"id": $scope.paisABorrar.id},
        //     headers: {'Content-Type': 'application/json'}
        // })
        // .then(function(response) {
        //     $scope.actualizarDatos();
        // });

        //  $http.delete(url + "/paises", {"id": $scope.paisABorrar.id}).then(function(response) { //No andaba el 'DELETE'
        //     $scope.actualizarDatos();
        // });
    //};