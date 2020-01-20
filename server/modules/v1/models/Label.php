<?php

namespace app\modules\v1\models;

use Yii;

/**
 * This is the model class for table "{{%label}}".
 *
 * @property int $id
 * @property string|null $name
 *
 * @property TransactionLabel[] $transactionLabels
 * @property Transaction[] $transactions
 */
class Label extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%label}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactionLabels()
    {
        return $this->hasMany(TransactionLabel::class, ['label_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::class, ['id' => 'transaction_id'])->viaTable('{{%transaction_label}}', ['label_id' => 'id']);
    }
}
