<?php

namespace app\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "{{%transaction}}".
 *
 * @property int $id
 * @property int $account_id
 * @property int $date
 * @property float|null $amount
 * @property string|null $comment
 * @property int $created_at
 * @property int $updated_at
 *
 * @property Account $account
 * @property TransactionCategory[] $transactionCategories
 * @property Category[] $categories
 * @property TransactionLabel[] $transactionLabels
 * @property Label[] $labels
 */
class Transaction extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%transaction}}';
    }

    public function behaviors()
    {
        return [
            'timestampBehavior' => [
                'class' => TimestampBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                    'value' => time(),
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['account_id', 'date'], 'required'],
            [['account_id', 'date', 'created_at', 'updated_at'], 'integer'],
            [['amount'], 'number'],
            [['comment'], 'string'],
            [['account_id'], 'exist', 'skipOnError' => true, 'targetClass' => Account::class, 'targetAttribute' => ['account_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'account_id' => 'Account ID',
            'date' => 'Date',
            'amount' => 'Amount',
            'comment' => 'Comment',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAccount()
    {
        return $this->hasOne(Account::class, ['id' => 'account_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactionCategories()
    {
        return $this->hasMany(TransactionCategory::class, ['transaction_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCategories()
    {
        return $this->hasMany(Category::class, ['id' => 'category_id'])->viaTable('{{%transaction_category}}', ['transaction_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactionLabels()
    {
        return $this->hasMany(TransactionLabel::class, ['transaction_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLabels()
    {
        return $this->hasMany(Label::class, ['id' => 'label_id'])->viaTable('{{%transaction_label}}', ['transaction_id' => 'id']);
    }
}