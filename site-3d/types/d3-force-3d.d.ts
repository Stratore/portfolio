// d3-force-3d n'expose pas de types officiels (contrairement à d3-force sur
// DefinitelyTyped). Déclaration minimale "any" pour permettre la compilation ;
// le code appelant reste typé explicitement côté lib/layout3d.ts.
declare module "d3-force-3d" {
    export function forceSimulation(nodes?: any[], numDimensions?: number): any;
    export function forceManyBody(): any;
    export function forceLink(links?: any[]): any;
    export function forceCenter(x?: number, y?: number, z?: number): any;
    export function forceCollide(radius?: any): any;
    export function forceX(x?: number): any;
    export function forceY(y?: number): any;
    export function forceZ(z?: number): any;
}
