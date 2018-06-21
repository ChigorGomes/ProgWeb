<?php
namespace frontend\models;

use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $id_curso;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required','message'=>'Este campo é obrigatório!'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Este nome de usuário já foi usado.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'trim'],
            ['email', 'required','message'=>'Este campo é obrigatório!'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Este email já foi usado.'],

            ['id_curso','required'],
            ['id_curso','integer'],



            ['password', 'required','message'=>'Este campo é obrigatório!'],
            ['password', 'string', 'min' => 6],
        ];
    }

    //muda o nome das Labels
    /********************************************8 */
    public function attributeLabels(){
        return [
            'id_curso'=> 'Selecione seu curso',
            'username' => 'Usuário',
            'password' => 'Senha',
        ];
    }
    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }
        
        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->id_curso = $this->id_curso;//salva o id_curso
        $user->setPassword($this->password);
        $user->generateAuthKey();


        
        return $user->save() ? $user : null;
    }
}
