<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "curso".
 *
 * @property int $id
 * @property string $nome
 * @property string $sigla
 * @property string $descricao
 *
 * 
 * 
 */
class Curso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'curso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'sigla', 'descricao'], 'required','message'=>'Este campo é obrigatório!'],
            [['descricao'], 'string'],
            [['nome'], 'string', 'max' => 45],
            [['sigla'], 'string', 'max' => 4],
        ];
    }

    public function getUsers(){
        return $this->hasMany(Users::className(),['id_curso'=>'id']);
    }

    //transforma em maiuscula
    public function beforeSave($tipo){
        $this->sigla = strtoupper($this->sigla);
        return parent::beforeSave($tipo);

    }


    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'sigla' => 'Sigla',
            'descricao' => 'Descrição',
        ];
    }

    /*Função que retorna a quantidade de alunos*/ 
    public function contUsuarios(){
        return User::find()->where(['id_curso'=>$this->id])->count();
    } 
}
