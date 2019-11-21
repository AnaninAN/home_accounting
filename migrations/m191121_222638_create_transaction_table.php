<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transaction}}`.
 */
class m191121_222638_create_transaction_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transaction}}', [
            'id' => $this->primaryKey(),
            'account_id' => $this->integer()->notNull(),
            'date' => $this->integer()->notNull(),
            'amount' => $this->decimal(10,2),
            'comment' => $this->text(),
            'created_at'=>$this->integer()->notNull(),
            'updated_at'=>$this->integer()->notNull()
        ]);

        $this->addForeignKey(
            'fk_transaction_account_id',
            '{{%transaction}}',
            'account_id',
            'account',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_transaction_account_id', '{{%transaction}}');
        $this->dropTable('{{%transaction}}');
    }
}
