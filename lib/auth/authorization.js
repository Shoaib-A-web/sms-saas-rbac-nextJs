import { prisma } from ".././prisma";
import { getCurrentSession } from "./session";

/*
|--------------------------------------------------------------------------
| Authentication Error
|--------------------------------------------------------------------------
*/

export class AuthenticationError extends Error {
  constructor(message = "Authentication required.") {
    super(message);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

/*
|--------------------------------------------------------------------------
| Authorization Error
|--------------------------------------------------------------------------
*/

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized.") {
    super(message);
    this.name = "AuthorizationError";
    this.status = 403;
  }
}

/*
|--------------------------------------------------------------------------
| Get Authorization Context
|--------------------------------------------------------------------------
|
| This loads:
|
| User
|   ↓
| UserRole
|   ↓
| Role
|   ↓
| RolePermission
|   ↓
| Permission
|
| And also:
|
| School
| Branch
|
*/


export async function getAuthContext() {
  const session = await getCurrentSession();

  if (!session) {
    throw new AuthenticationError();
  }

  const userId = session.user.id;

  const userRoles = await prisma.userRole.findMany({
    where: {
      user_id: userId,
    },

    select: {
      role_id: true,
      school_id: true,
      branch_id: true,

      role: {
        select: {
          name: true,

          role_permissions: {
            select: {
              permission: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const roles = [
    ...new Set(
      userRoles.map(
        (userRole) => userRole.role.name
      )
    ),
  ];

  const permissions = [
    ...new Set(
      userRoles.flatMap(
        (userRole) =>
          userRole.role.role_permissions.map(
            (rolePermission) =>
              rolePermission.permission.name
          )
      )
    ),
  ];

  const isSuperAdmin =
    roles.includes("SUPER_ADMIN");

  return {
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      phone: session.user.phone,
      status: session.user.status,
    },

    userId,

    roles,

    permissions,

    isSuperAdmin,

    userRoles,
  };
}


/*
|--------------------------------------------------------------------------
| Require Authentication
|--------------------------------------------------------------------------
*/

export async function requireAuth() {
  return getAuthContext();
}

/*
|--------------------------------------------------------------------------
| Check Role
|--------------------------------------------------------------------------
*/

export function hasRole(auth, roleName) {
  if (auth.isSuperAdmin) {
    return true;
  }

  return auth.roles.includes(roleName);
}

/*
|--------------------------------------------------------------------------
| Require Role
|--------------------------------------------------------------------------
*/

export function requireRole(auth, roleName) {
  if (!hasRole(auth, roleName)) {
    throw new AuthorizationError(
      `Role ${roleName} is required.`
    );
  }

  return true;
}

/*
|--------------------------------------------------------------------------
| Check Permission
|--------------------------------------------------------------------------
*/

export function hasPermission(auth, permissionName) {
  if (auth.isSuperAdmin) {
    return true;
  }

  return auth.permissions.includes(permissionName);
}

/*
|--------------------------------------------------------------------------
| Require Permission
|--------------------------------------------------------------------------
*/

export function requirePermission(auth, permissionName) {
  if (!hasPermission(auth, permissionName)) {
    throw new AuthorizationError(
      `Permission ${permissionName} is required.`
    );
  }

  return true;
}

/*
|--------------------------------------------------------------------------
| Check School Access
|--------------------------------------------------------------------------
*/

export function hasSchoolAccess(auth, schoolId) {
  if (auth.isSuperAdmin) {
    return true;
  }

  return auth.schoolIds.some(
    (id) => id.toString() === schoolId.toString()
  );
}

/*
|--------------------------------------------------------------------------
| Require School Access
|--------------------------------------------------------------------------
*/

export function requireSchoolAccess(auth, schoolId) {
  if (!hasSchoolAccess(auth, schoolId)) {
    throw new AuthorizationError(
      "You do not have access to this school."
    );
  }

  return true;
}

/*
|--------------------------------------------------------------------------
| Check Branch Access
|--------------------------------------------------------------------------
*/

export function hasBranchAccess(auth, branchId) {
  if (auth.isSuperAdmin) {
    return true;
  }

  return auth.branchIds.some(
    (id) => id.toString() === branchId.toString()
  );
}

/*
|--------------------------------------------------------------------------
| Require Branch Access
|--------------------------------------------------------------------------
*/

export function requireBranchAccess(auth, branchId) {
  if (!hasBranchAccess(auth, branchId)) {
    throw new AuthorizationError(
      "You do not have access to this branch."
    );
  }

  return true;
}


export function hasScopeAccess(
  auth,
  schoolId,
  branchId
) {
  if (auth.isSuperAdmin) {
    return true;
  }

  return auth.userRoles.some((userRole) => {
    const sameSchool =
      userRole.school_id &&
      userRole.school_id.toString() === schoolId.toString();

    /*
     * school-level assignment
     *
     * branch_id = null
     *
     * means the user may have access
     * to the whole school.
     */
    if (
      sameSchool &&
      userRole.branch_id === null
    ) {
      return true;
    }

    const sameBranch =
      userRole.branch_id &&
      userRole.branch_id.toString() === branchId.toString();

    return sameSchool && sameBranch;
  });
}

export function requireScopeAccess(
  auth,
  schoolId,
  branchId
) {
  if (!hasScopeAccess(auth, schoolId, branchId)) {
    throw new AuthorizationError(
      "You do not have access to this school or branch."
    );
  }

  return true;
}
