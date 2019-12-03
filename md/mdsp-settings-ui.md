
## 从 usermanagement ui 看 [resolve](https://angular.cn/guide/router#resolve-pre-fetching-component-data) 的应用

Resolve 的作用：
导航到某路由时，为了不想看到空的组件（从后端获取的数据尚未拿到），提前 拿到 数据，供要导航到的目的页使用。

组件内不再负责获取所需要的数据，而是从 Resolve service 中获取数据

```ts
// app.routes.ts
{
    path: 'users',
    component: UserComponent,
    resolve: {
        userResolver: UserResolverService,
        roleResolver: RoleResolverService,
        dataViewResolver: DataViewResolverService,
        tenantInfoResolver: TenantInfoResolverService
    }
}
```


```ts
// user.resolver.service.ts
@Injectable()
export class UserResolverService implements Resolve<void> {

    constructor(
        private userDataService: UserDataService,
        private userFacade: UserFacade,
        private errorHandlerService: ErrorHandlerService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.fetchUsers();
    }

    private fetchUsers() {
        return this.userDataService.get()
            .map((users: User[]) => { // 将获取到的数据存到 userFacade 中
                return this.userFacade.setUsers(users);
            })
            .catch((err: any) => {
                return this.errorHandlerService.handleServerError(err, new ServerError());
            });
    }
}
```

组件中取数据时都是从 userFacade 中获取

```ts
// user-list.component.ts
@Component({
    selector: 'usm-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent {
    public sortedListItemsOfUsersBySearchTerm$: Observable<NavigationListItem[]> = null;
    public isNavigationTreeShown$: Observable<boolean>;

    constructor(private userFacade: UserFacade, uiFacade: UiFacade) {
        // 实例化的的时候，从 userFacade 取数据
        this.sortedListItemsOfUsersBySearchTerm$ = this.userFacade.sortedListItemsOfUsersBySearchTerm$;
        this.isNavigationTreeShown$ = uiFacade.isNavigationTreeShown$;
    }

    setFilter(searchTerm) {
        this.userFacade.setSearchTerm(searchTerm);
    }
}
```

看看 user.facade.ts 中在做什么

```ts
@Injectable()
export class UserFacade implements OnDestroy {
    public getSortedAndFilteredUsersAndDataViews$ = this.store.select(UserWithDataViewQuery.getSortedAndFilteredUsersWithDataViews);
    public getSortedAndFilteredDataViewUsersWithDataViews$ = this.store.select(UserWithDataViewQuery.getSortedAndFilteredDataViewUsersWithDataViews);
    public selectedUser$ = this.store.select(UserWithDataViewQuery.getSelectedUserWithDataViews);
    public selectedUserId$ = this.store.select(UserQuery.getSelectedUserId);
    public selectedUserHeaderTitle$ = this.store.select(UserQuery.getSelectedUserHeaderTitle);
    public usersOfSelectedRole$ = this.store.select(UserByRoleQuery.getUsersOfSelectedRole);
    public sortedListItemsOfUsersBySearchTerm$ = this.store.select(UserQuery.getSortedListItemsOfUsersBySearchTerm);
    public isSelectedUserInSearchTerm$ = this.store.select(UserQuery.isSelectedUserInSearchTerm);
    public globalUsers$ = this.store.select(UserQuery.getGlobalUsers);
    public filter: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private _destroyUserSub: Subject<void>;
    private sub: Subscription;

    constructor(private store: Store<ApplicationState>, private router: Router, private userUtilService: UserUtilService) {
        this.sub = this.filter.debounceTime(300).distinctUntilChanged().subscribe((searchTerm: string) => {
            this.store.dispatch(new UserSearch(searchTerm));
        });
    }

    setUsers(users: User[]) {
        this.store.dispatch(new UserLoaded(users));
    }

    addUser(user: User) {
        this.store.dispatch(new UserAdd(user));
    }

    updateUser(user: User) {
        const deliverableUser = this.userUtilService.getDeliverableUserCopy(user);
        this.store.dispatch(new UserUpdate(deliverableUser));
    }

    deleteUser(userId: string) {
        this.store.dispatch(new UserDelete(userId));
    }

    setSearchTerm(searchTerm: string) {
        this.filter.next(searchTerm);
    }

    setSelectedUser(userId: string) {
        this.store.dispatch(new UserSelected(userId));
    }

    setSelectedUserToFirst() {
        this._destroyUserSub = new Subject<void>();
        this.sortedListItemsOfUsersBySearchTerm$
            .takeUntil(this._destroyUserSub)
            .subscribe((users: NavigationListItem[]) => {
                if (users && users.length > 0) {
                    this._destroyUserSub.next();
                    this._destroyUserSub.complete();
                    this.router.navigate(users[0].routerLink);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
```

user.facade.ts 中封装了 ngrx 的各种操作。为应用，提供了统一的状态管理。
