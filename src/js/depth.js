export class Depth {
    constructor(x, y, z){
        this.z = z || 0;
    }

    add(depth){
        this.z += depth.z;
        return this;
    }

    subtract(depth){
        this.z -= depth.z;
        return this;
    }

    reduce(value){
        this.z *= value;
        return this;
    }

    clone(){
        return new Depth(this.x, this.y, this.z);
    }
}