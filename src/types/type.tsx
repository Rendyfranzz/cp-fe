

export type Body = {
    Name :   string 
	Datatype : string 
}

type Dictionary = {
	Attribute: string 
	Operator : string 
	Label    : string 
}

type Action = {
	Attribute :string,
	Label     :string
	Datatype  :string 
}

type Rule = {
	Value : [] 
	Action : any   
}