import { Component, OnInit, ViewChild, } from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { TableData } from '../lbd/lbd-table/lbd-table.component';
import { Router } from '@angular/router';
import { NotificationService, NotificationType, NotificationOptions } from '../lbd/services/notification.service';
import * as vars from '../config';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

import { CompleterCmp, CompleterItem, CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { Observable } from "rxjs";
import { Http, Headers, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';
import { CustomData } from "../services/custom-data";
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './users-app.component.html',
  styleUrls: ['./users-app.component.scss'],
  animations: [
    trigger('cardprofile', [
      state('*', style({
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
    trigger('cardtable1', [
      state('*', style({
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
    trigger('carduserprofile', [
      state('*', style({
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
  ]
})
export class UsersAppComponent implements OnInit {
  
  public tableData: any;
  public users: Array<any> = [];
  public usersAll:Array<any> = [];
  public usersArray = new Array();
  public allUsers = new Array();
  public formData: any;
  public sponsor: any;
  public platinum: any;
  public positions: any;
  public row: any;
  public notify: any;
  public rols: any;
  public title: string = 'Agregar';
  public titleModal: string = 'Perfil';
  public titleModalEdit: string = 'Editar Usuario';
  public iconActiveUser: string = 'pe-7s-power';
  //public page: number = 1;
  public pagination: number = vars.pagination;
  public showEditForm : boolean = false;
  public showCardUser : boolean = false;
  public showNewForm : boolean = false;

  public progress: boolean = false;
  public status: number = 0;

  public page:number = 1;
  
  public args: any = [];

  private data:Array<any> = [];
  //private data_patro:Array<any> = [];
  //protected dataService: CompleterData;
  public data_sponsor: FormControl;
  public data_platinum: FormControl;
  
  public myFormSponsor: FormGroup;
  public myFormPlatinum: FormGroup;

  @ViewChild('modalEdit', {static:true})
  modalEdit: ModalComponent;
  @ViewChild('modal', {static:true})
  modal: ModalComponent;
  public customData: CustomData;
  @ViewChild("remoteDataSponsor", {static:true}) private remoteDataSponsor: CompleterCmp;
  @ViewChild("remoteDataPlatinum", {static:true}) private remoteDataPlatinum: CompleterCmp;
  public name: string;
  public placeholderSponsor: string;
  public placeholderPlatinum: string;

  public search:string ='';

  public formCompany: any;
  public formSubCompany: any;
  public myFormCompany: FormGroup;
  public myFormSubCompany: FormGroup;
  public disabledSubCompany: boolean = false;
  public dataCompany: FormControl;
  public dataSubCompany: FormControl;

  constructor(private http: Http, private completerService: CompleterService, private builder: FormBuilder, private _sanitizer: DomSanitizer, private userService: UserService, private navbarTitleService: NavbarTitleService, private notificationService: NotificationService, private router: Router) {
    this.customData = new CustomData(userService, http); 
  }

  public ngOnInit() {
  
    this.navbarTitleService.updateTitle('Usuarios APP');
    if(!this.userService.isAdmin() && !this.userService.isAuth() )
        this.router.navigate(['/dashboard']);

    //this.notify = {show: false, message: ''};
    this.tableData = {
    headerRow: ['Nombre', 'Apellido', 'Email' , 'Empresa', 'Organización', 'ACCIONES'],
  };

    this.data = [];
    //this.data_patro = [];
    
    this.formData = {
     /* ita: '',
      email: '',
      name: '',
      last: '',
      address: '',
      id_position: '',
      id_rol: '',
      status:''*/
    };

    this.showCardUser = this.showEditForm = this.showNewForm = this.progress = false;
    this.getRols();    
    this.getPositions();
    this.getUsers(this.search);
    //this.getUsersAll();
    //this.getUsersPlatinum();
    this.myFormSponsor = this.builder.group({
      sponsor : "",
    });
    this.myFormPlatinum = this.builder.group({
      platinum : "",
    });
    this.placeholderSponsor = "Nombre del patriconador o ITA...";
    this.placeholderPlatinum = "Nombre del platino directo o ITA...";

    this.formCompany = { };
    this.formSubCompany= { };
    this.myFormCompany = this.builder.group({
      company : ['0', [Validators.required, Validators.minLength(3)]],
    });

    this.myFormSubCompany = this.builder.group({
      sub_company :  ['0', [Validators.required, Validators.minLength(3)]],
    });

    this.getCompanies();

    this.formData.id_company = 0;
    this.formData.id_sub_company = 0;
    
  }

  public getCompanies() {
    //this.progress = true;
    this.userService.getCompanies().subscribe(
      (response) => this.dataCompany = response.json(), 
      (error) => console.log(error.json()), 
      //() => this.onCompleteLogin()
  );
    //console.log (val);
    //this.authService.login_2(this.formData);
  }


  public getSubCompanies(id_company){
    //console.log(id_category);
     this.disabledSubCompany = true;
      this.formCompany.id_sub_company=1;
      this.userService.getSubCompanies(0).subscribe(
       (response) => {
         this.dataSubCompany = response.json().filter(i => i.id_company == id_company); 
         this.formCompany.id_sub_company=0;
         this.disabledSubCompany = false;
       }, 
       (error) => console.log(error.json()), 
       //() => this.onCompleteLogin()
   );
 }

  public getNameUser(ita){
    let name = '';
    this.usersAll.filter(i => i.ita == ita ).forEach(element => {
      //console.log(element.name);
       name = element.name + ' '+ element.last;
    });
    return name;
  }



  public filterValues(val){
      console.log(val);
      this.args = {
        name: val
      }
      
  }

  public onSponsorSelected(selected: CompleterItem) {
    if (selected) {
      //console.log(selected.originalObject);
        this.formData.sponsor = {
          "ita": selected.originalObject.ita,
          "name": selected.originalObject.name + ' ' + selected.originalObject.last
        };
        this.remoteDataSponsor.blur();
        this.remoteDataPlatinum.focus();
    } else {
        this.formData.sponsor = {};
    }
    //console.log(this.formData);
  }

  public onPlatinumSelected(selected: CompleterItem) {
    if (selected) {
      //console.log(selected.originalObject);
        this.formData.platinum = {
          "ita": selected.originalObject.ita,
          "name": selected.originalObject.name + ' ' + selected.originalObject.last
        };
        this.remoteDataPlatinum.blur();
    } else {
        this.formData.platinum = {};
    }
    //console.log(this.formData);
  }

    public newUser(){

   
    this.showNewForm = true;
    this.showEditForm = false;
    this.showCardUser = false;
    
    this.formData = {
      ita: '',
      email: '',
      name: '',
      last: '',
      address: '',
      id_position: '',
      phone:'',
      id_rol: 4,
      status:1,
      password:'',
      id_company:0,
      id_sub_company:0,
      photo:'',
      id_question:1,

    };
    
  }


   autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name} ${data.last}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }


    myCallback($event){
      console.log($event.name)
      this.formData.sponsor = {
      "ita": $event.ita,
      "name": ($event.name + ' ' + $event.last)
    }
    }

  public editUser(row){
    this.showEditForm = true;
    this.showCardUser = false;
    this.formData = row;
    this.sponsor = row.name_sponsor;
    this.platinum = row.name_platinum;
    this.getSubCompanies(row.id_company);
    this.formData.id_sub_company = row.id_sub_company;
    this.formData.sponsor = {
      "ita": row.ita_sponsor,
      "name": row.name_sponsor
    }
    this.formData.platinum = {
      "ita": row.ita_platinum,
      "name": row.name_platinum
    }
   //console.log(this.formData);
  }

  public showUser(row){
    this.formData = row;
    //console.log();
    this.modal.open();
  }

  public onSubmitNewUser(){
    this.progress=true;
    console.log('Submitting values', this.formData);
    
    this.userService.newUserApp(this.formData, this.formData.sponsor, this.formData.platinum).subscribe(
        (response) => this.onSuccessNewUser(response.json()), 
        (error) => this.onErrorNewUser(error.json()), 
        () => this.onCompleteNewUser()
      );
      
  }

   onSuccessNewUser(response){
    this.showNotification('top', 'center', '<b>'+response.message+'</b>', 'pe-7s-check', 2);
    console.log(response);
    
  }

  onErrorNewUser(error){
    this.progress = false;
    this.showNewForm = true;
    this.showEditForm = false;
    this.showCardUser = false;
    this.showNotification('top', 'center', '<b>'+error.message+'</b>', 'pe-7s-attention', 4);
    console.log(error.message);   
  }

  onCompleteNewUser(){
    console.log('ok');
    this.ngOnInit();
   }

  public onSubmitEditUser(){
    this.progress=true;
    console.log('Submitting values', this.formData);
     this.userService.updateUserApp(this.formData, this.formData.sponsor, this.formData.platinum).subscribe(
        (response) => this.onSuccessUpdate(response.json()), 
        (error) => this.onErrorUpdate(error.json()), 
        () => this.onCompleteUpdate()
      );
  }

    onSuccessUpdate(response){
    this.showNotification('top', 'center', '<b>'+response.message+'</b>', 'pe-7s-check', 2);
    console.log(response);
  }

    onErrorUpdate(error){
    this.progress = false;
    this.showEditForm = true;
    this.showNewForm = false;
    this.showCardUser = false;
    this.showNotification('top', 'center', '<b>'+error.message+'</b>', 'pe-7s-attention', 4);
    console.log(error.message);  
  }
  
  onCompleteUpdate(){
    console.log('ok');
    this.ngOnInit();
    }

  public changeStatus(row){
    //this.getStatus(row);
    //this.formData = this.allUsers.find(ele => ele.ita == row.ita)
    this.progress=true;
    this.userService.updateStatus(row).subscribe(
        (response) => this.onSuccessStatus(response.json()), 
        (error) => this.onErrorStatus(error.json()), 
        () => this.onCompleteStatus()
      );
 
  }

  onSuccessStatus(response){
    this.showNotification('top', 'center', '<b>'+response.message+'</b>', 'pe-7s-check', 2);
    console.log(response);
  }

  onErrorStatus(error){
    this.progress = false;
    this.showNotification('top', 'center', '<b>'+error.message+'</b>', 'pe-7s-attention', 4);
    console.log(error.message);   
  }
  
  onCompleteStatus(){
    this.ngOnInit();
    //this.router.navigate(['/users']);
  }


  public deleteUser(row){

    this.progress=true;
    this.userService.deleteUser(row).subscribe(
        (response) => this.onSuccessDeleteUser(response.json()), 
        (error) => this.onErrorDeleteUser(error.json()), 
        () => this.onCompleteDeleteUser()
      );
 
  }

  onSuccessDeleteUser(response){
    this.showNotification('top', 'center', '<b>'+response.message+'</b>', 'pe-7s-check', 2);
    //console.log(response);
  }

  onErrorDeleteUser(error){
    this.progress = false;
    this.showNotification('top', 'center', '<b>'+error.message+'</b>', 'pe-7s-attention', 4);
    //console.log(error.message);   
  }
  
  onCompleteDeleteUser(){
    this.ngOnInit();
    //this.router.navigate(['/users']);
  }
  
  public addUser(){
    this.notify = {show: false, message: ''};
    this.notify.show = true;
    this.notify.message = 'Error';
    this.modal.close();
    this.showNotification('top', 'center', 'Usuario Agregado', 'pe-7s-check', 2);

  }

  public getRols(){
    //console.log(this.rols);
    this.userService.getRols().subscribe(
        (response) => this.rols = response.json(), 
        (error) => console.log(error.json()), 
        //() => this.onCompleteLogin()
    );
  }

  public getStatusUser(ita): void{
    //console.log(this.rols);
    this.userService.getStatus(ita).subscribe(
        (response) => this.status = response.json().status, 
        (error) => console.log(error.json()), 
        //() => this.onCompleteLogin()
    );
    //return this.status;
  }

  public getPositions(){
    //console.log(this.rols);
    this.userService.getPositions().subscribe(
        (response) => this.positions = response.json(), 
        (error) => console.log(error.json()), 
        //() => this.onCompleteLogin()
    );
  }
  public getUsers(q){
    this.progress = true;
    //console.log(this.rols);
    this.userService.getUsers(q).subscribe(
        (response) => this.onSuccessUsers (response),
        (error) => { 
          this.showNotification('top', 'center', '<b>'+error.json().message+'</b>', 'pe-7s-attention', 4); 
          console.log(error.json()); 
          this.progress=false; 
          this.data = [];
        }, 
        //() => this.onCompleteLogin()
    );
  }


  public onSuccessUsers(response){
  this.progress = false;
  this.usersAll = response.json();
  //this.data_sponsor = response.json();
  //this.data_platinum = response.json().filter(i => i.id_position < '6') ;

  // if(this.userService.isAdmin())
  //   this.data = response.json();//.filter(i => i.id_rol == '4');
  // else
  //   this.data = response.json().filter(i => /*i.id_rol == '4' &&*/ i.ita_platinum == localStorage.getItem('ita')); 
  this.data = response.json().filter(i => i.id_rol == '4');
  }

public getUsersAll(q){
    this.progress = true;
    //console.log(this.rols);
    this.userService.getUsers(q).subscribe(
        (response) => this.onSuccessUsersAll (response),
        (error) => console.log(error.json()), 
        //() => this.onCompleteLogin()
    );
  }


  public onSuccessUsersAll(response){
  this.progress = false;
  //this.data_sponsor = response.json();
  
  //this.dataService = this.completerService.local(this.data_patro, 'name.ita', 'name');
  //this.data = response.json().filter(i => i.id_rol == '4' && i.ita_master == localStorage.getItem('ita')); 
  //this.data = this.data.filter(i => i.id_rol < '4') ;
  }

  public getUsersPlatinum(q){
    this.progress = true;
    //console.log(this.rols);
    this.userService.getUsers(q).subscribe(
        (response) => this.onSuccessUsersPlatinum (response),
        (error) => console.log(error.json()), 
        //() => this.onCompleteLogin()
    );
  }


  public onSuccessUsersPlatinum(response){
  this.progress = false;
  //this.data_platinum = response.json();
  //this.dataService = this.completerService.local(this.data_patro, 'name.ita', 'name');
  //this.data = response.json().filter(i => i.id_rol == '4' && i.ita_master == localStorage.getItem('ita')); 
  this.data_platinum = response.json().filter(i => i.id_position < '4') ;
  }

   public showNotification(from: string, align: string, message: string, icon: string, type: number) {
    //const type = Math.floor((Math.random() * 4) + 1);
    //console.log (type);
    this.notificationService.notify(new NotificationOptions({
      message: message,
      icon: icon,
      type: <NotificationType>(type),
      from: from,
      align: align
    }));
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

  
  isAuth(){
    return this.userService.isAuth();
  }

}