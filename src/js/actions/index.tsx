
declare global{

	interface app {
			userName: string,
			roleId:string[],
			roleIndex: number,
			roleName: string[],
			orgId: string[],
			orgName:string [],
			 id: string,
	}

	interface appStore {
			app:TypedMap<app>,
	}

}
const a = "3";

export {a};